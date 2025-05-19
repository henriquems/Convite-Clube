import { RelatorioRetornoSaida, RepositorioRetorno, Retorno, StatusUsuario } from '@conviteclube/core';
import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { PrismaService } from 'src/db/prisma.service';
import { join } from 'path';
import { Prisma } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class RetornoPrisma implements RepositorioRetorno {
    constructor(private readonly prisma: PrismaService) {}

    async listar(page: string, pageSize: string) {
        const pag = parseInt(page);
        const tam = parseInt(pageSize);
        const offset = (pag - 1) * tam;

        const [totalResult, data] = await this.prisma.$transaction([
            this.prisma.$queryRawUnsafe<{ count: number }[]>(`
                SELECT COUNT(*) as count
                FROM (
                    SELECT DISTINCT arquivo, agencia, conta, data_processamento, 
                        status = case when lrt.descricao like '|** ARQUIVO REPROCESSADO **|%' 
                        then 'REPOCESSADO' ELSE 'PROCESSADO' END 
                    FROM retorno ret 
                    JOIN log_retorno lrt ON ret.id = lrt.retorno_id
                    WHERE agencia IS NOT NULL OR banco IS NOT NULL 
                    AND ret.tipo_linha = 'HEADER' 
                ) AS subquery
            `),
            this.prisma.$queryRawUnsafe<any[]>(`
                SELECT DISTINCT arquivo, agencia, conta, data_processamento AS "dataProcessamento", 
                    status = case when lrt.descricao like '|** ARQUIVO REPROCESSADO **|%' 
                    then 'REPOCESSADO' ELSE 'PROCESSADO' END 
                FROM retorno ret 
                JOIN log_retorno lrt ON ret.id = lrt.retorno_id
                WHERE agencia IS NOT NULL OR banco IS NOT NULL 
                AND ret.tipo_linha = 'HEADER' 
                ORDER BY 4 DESC, 2
                OFFSET ${offset} ROWS FETCH NEXT ${tam} ROWS ONLY
            `)
        ]);

        return {
            total: Number(totalResult[0]?.count ?? 0),
            data
        };
    }

    async recuperar(valor: number): Promise<Retorno | null> {
        const id = Number(valor);

        const retorno = await this.prisma.retorno.findUnique({
            where: { id },
            include: {
                statusRetorno: true,
                usuario: true
            },
        });

        if (!retorno) return null;

        return {
            ...retorno,
            usuario: {
                ...retorno.usuario,
                status: retorno.usuario.status as StatusUsuario,
            },
        };
    }

    async salvar(retorno: Retorno): Promise<void> {
        await this.prisma.$executeRaw`
            EXEC SP_WBM_INSERE_LINHA_RETORNO 
                ${retorno.arquivo}, 
                ${retorno.linha}, 
                ${retorno.usuario.id}, 
                ${retorno.dataProcessamento}, 
                ${retorno.banco}
        `;
    }

    async gerarRelatorio(arquivo: string, dataProcessamento: Date): Promise<Buffer> {
        try {
            const registros = await this.prisma.$queryRaw<RelatorioRetornoSaida[]>(Prisma.sql`
                SELECT * 
                FROM VW_WBM_REL_BAIXA_RETORNO
                WHERE ARQUIVO = ${arquivo} AND DATA_PROCESSAMENTO = ${dataProcessamento}
                ORDER BY TIPO, boleto
            `);

            const resumo = await this.prisma.$queryRaw<any[]>(Prisma.sql`
                SELECT 
                    motivo = REPLACE(MOTIVO, '|** ARQUIVO REPROCESSADO **| ', ''),
                    somaValorPago = SUM(valorPago),
                    somaValorBoleto = SUM(valorBol),
                    somaValorDescontoBoleto = SUM(valorDescBol),
                    qtde = COUNT(1)
                FROM VW_WBM_REL_BAIXA_RETORNO
                WHERE ARQUIVO = ${arquivo} AND DATA_PROCESSAMENTO = ${dataProcessamento}
                GROUP BY motivo
                ORDER BY motivo
            `);

            const assetsPath = join(__dirname, '..', 'assets', 'fonts');
            const fonts = {
                Roboto: {
                    normal: join(assetsPath, 'Roboto-Regular.ttf'),
                    bold: join(assetsPath, 'Roboto-Bold.ttf'),
                    italics: join(assetsPath, 'Roboto-Italic.ttf'),
                    bolditalics: join(assetsPath, 'Roboto-BoldItalic.ttf'),
                },
            };

            const printer = new PdfPrinter(fonts);

            const formatRow = (r: RelatorioRetornoSaida) => [
                r.boleto,
                r.status,
                r.data_processamento,
                r.motivo,
                r.valorBol.toFixed(2),
                r.valorDescBol.toFixed(2),
                r.valorPAGO.toFixed(2),
                r.tarifa.toFixed(2),
                r.dataliq ?? '',
                r.dataCred ?? '',
                r.tipo,
            ];

            const header = [
                'Boleto', 'Status', 'Data Processamento', 'Motivo', 'Valor Boleto',
                'Valor Desc.', 'Valor Pago', 'Tarifa', 'Data Liq.', 'Data Cred.', 'Tipo'
            ];

            const baixaNormal = registros.filter(r => r.tipo === 'Baixa Normal');
            const outrasOcorrencias = registros.filter(r => r.tipo === 'Outras Ocorrências');

            const calcularTotais = (grupo: RelatorioRetornoSaida[]) => {
                const totalValorBol = grupo.reduce((sum, r) => sum + Number(r.valorBol ?? 0), 0);
                const totalValorDesc = grupo.reduce((sum, r) => sum + Number(r.valorDescBol ?? 0), 0);
                const totalValorPago = grupo.reduce((sum, r) => sum + Number(r.valorPAGO ?? 0), 0);

                return [
                    { text: 'Totais:', colSpan: 4, alignment: 'right', bold: true }, {}, {}, {},
                    totalValorBol.toFixed(2),
                    totalValorDesc.toFixed(2),
                    totalValorPago.toFixed(2),
                    '', '', '', ''
                ];
            };

            const docDefinition: TDocumentDefinitions = {
                pageOrientation: 'landscape',
                content: [
                    { text: 'Relatório de Baixa Arquivo Retorno', style: 'header' },
                    { text: `Arquivo: ${arquivo}`, style: 'subheader' },
                    { text: `Data de Processamento: ${dataProcessamento.toLocaleString()}`, style: 'subheader' },

                    { text: 'Baixa Normal', style: 'sectionTitle', margin: [0, 10, 0, 4] },
                    {
                        table: {
                            headerRows: 1,
                            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                            body: [
                                header,
                                ...baixaNormal.map(formatRow),
                                calcularTotais(baixaNormal)
                            ]
                        },
                        layout: 'lightHorizontalLines',
                        style: 'table',
                        margin: [0, 0, 0, 10],
                    },

                    { text: 'Outras Ocorrências', style: 'sectionTitle', margin: [0, 10, 0, 4] },
                    {
                        table: {
                            headerRows: 1,
                            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                            body: [
                                header,
                                ...outrasOcorrencias.map(formatRow),
                                calcularTotais(outrasOcorrencias)
                            ]
                        },
                        layout: 'lightHorizontalLines',
                        style: 'table',
                        margin: [0, 0, 0, 10],
                    },

                    { text: 'Resumo por Motivo', style: 'sectionTitle', margin: [0, 20, 0, 6] },
                    {
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
                            body: [
                                ['Motivo', 'Qtde', 'Valor Boleto', 'Valor Desc.', 'Valor Pago'],
                                ...resumo.map(r => [
                                    r.motivo,
                                    r.qtde,
                                    r.somaValorBoleto.toFixed(2),
                                    r.somaValorDescontoBoleto.toFixed(2),
                                    r.somaValorPago.toFixed(2),
                                ]),
                                [
                                    { text: 'Totais Gerais:', alignment: 'right', bold: true },
                                    resumo.reduce((sum, r) => sum + Number(r.qtde), 0),
                                    resumo.reduce((sum, r) => sum + Number(r.somaValorBoleto), 0).toFixed(2),
                                    resumo.reduce((sum, r) => sum + Number(r.somaValorDescontoBoleto), 0).toFixed(2),
                                    resumo.reduce((sum, r) => sum + Number(r.somaValorPago), 0).toFixed(2),
                                ]
                            ]
                        },
                        layout: 'lightHorizontalLines',
                        style: 'table',
                    }
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10],
                    },
                    subheader: {
                        fontSize: 12,
                        margin: [0, 5, 0, 5],
                    },
                    sectionTitle: {
                        fontSize: 12,
                        bold: true,
                        decoration: 'underline',
                    },
                    table: {
                        fontSize: 8,
                    },
                },
                defaultStyle: {
                    font: 'Roboto',
                }
            };

            const pdfDoc = printer.createPdfKitDocument(docDefinition);
            const chunks: Buffer[] = [];

            return new Promise((resolve, reject) => {
                pdfDoc.on('data', (chunk) => chunks.push(chunk));
                pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
                pdfDoc.on('error', (err) => {
                    console.error('Erro no stream do PDF:', err);
                    reject(err);
                });
                pdfDoc.end();
            });
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            throw new Error('Erro ao gerar relatório');
        }
    }

            
}