import { PrismaService } from 'src/db/prisma.service';
import { FiltroRelatorioPedidoDto, Pedido, RepositorioPedido, StatusPagamento, StatusUsuario } from '@conviteclube/core';
import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class PedidoPrisma implements RepositorioPedido {
    constructor(private readonly prisma: PrismaService){}
  
    async listar(page: string, pageSize: string, usuario?: { id: number, perfis: string[] }): Promise<{ total: number, data: Pedido[] }> {
        const pag = parseInt(page);
        const tam = parseInt(pageSize);
    
        const isAdministrador = usuario?.perfis.includes('ADMINISTRADOR');
    
        const where = isAdministrador ? {} : { usuarioId: usuario?.id };
    
        const [total, data] = await this.prisma.$transaction([
            this.prisma.pedido.count({ where }),
            this.prisma.pedido.findMany({
                where,
                skip: (pag - 1) * tam,
                take: tam,
                include: {
                    usuario: {
                        include: {
                            perfis: true,
                        },
                    },
                    periodoInscricao: {
                        include: {
                            clube: true,
                        },
                    },
                },
                orderBy: {
                    id: "desc"
                }
            })
        ]);
    
        return {
            total,
            data: data.map(pedido => ({
                ...pedido,
                statusPagamento: pedido.statusPagamento as StatusPagamento,
                valorPedido: Number(pedido.valorPedido),
                valorPago: pedido.valorPago ? Number(pedido.valorPago) : null,
                usuario: {
                    ...pedido.usuario,
                    status: pedido.usuario.status as StatusUsuario
                },
                periodoInscricao: {
                    ...pedido.periodoInscricao,
                    valorConvite: Number(pedido.periodoInscricao.valorConvite),
                },
            })),
        };
    }

    async recuperar(valor: number): Promise<Pedido | null> {
        const id = Number(valor);

        const pedido = await this.prisma.pedido.findUnique({
            where: { id },
            include: {
              usuario: {
                include: {
                  perfis: true,
                  curso: true,
                  periodoLetivo: true,
                },
              },
              periodoInscricao: {
                include: {
                  clube: true,
                },
              },
            },
        });

        if (!pedido) return null;

        return {
            ...pedido,
            usuario: {
                ...pedido.usuario,
                status: pedido.usuario.status as StatusUsuario,
            },
            statusPagamento: pedido.statusPagamento as StatusPagamento,
            valorPedido: Number(pedido.valorPedido.toFixed(2)),
            valorPago: pedido.valorPago ? Number(pedido.valorPago.toFixed(2)) : null,
            periodoInscricao: {
                ...pedido.periodoInscricao,
                valorConvite: Number(pedido.periodoInscricao.valorConvite.toFixed(2)),
            },
        };
    }

    async excluir(valor: number): Promise<void> {
        const id = Number(valor)

        await this.prisma.pedido.delete({
          where: { id },
        });
    }

    async quantidadePorPeriodo(periodoInscricaoId: number): Promise<number> {
        return await this.prisma.pedido.count({
            where: {
                periodoInscricao: {
                    id: periodoInscricaoId
                }
            }
        });
    }

    async salvar(pedido: Pedido): Promise<void> {
       await this.prisma.pedido.create({
            data: {
                usuario: {
                    connect: {
                      id: pedido.usuario.id,
                    },
                },
                periodoInscricao: {
                    connect: {
                      id: pedido.periodoInscricao.id,
                    },
                },
                numero: pedido.numero,
                statusPagamento: pedido.statusPagamento,
                valorPedido: pedido.valorPedido,
                dataPedido: pedido.dataPedido
            }
        })
    }

    async gerarRelatorioPedidos(filtros: FiltroRelatorioPedidoDto): Promise<Buffer> {
        const pedidos = await this.prisma.pedido.findMany({
            where: {
                usuarioId: filtros.usuario ? Number(filtros.usuario) : undefined,
                periodoInscricaoId: filtros.periodoInscricao ? Number(filtros.periodoInscricao) : undefined,
                statusPagamento: filtros.statusPagamento || undefined,
                numero: filtros.numero ? { contains: filtros.numero } : undefined,
                usuario: filtros.curso ? { cursoId: Number(filtros.curso) } : undefined,
                periodoInscricao: filtros.clube ? { clubeId: Number(filtros.clube) } : undefined,
            },
            include: {
                usuario: { include: { curso: true } },
                periodoInscricao: { include: { clube: true } },
            },
        });

        const workbook = new Workbook();
        const sheet = workbook.addWorksheet('Relatório de Pedidos');

        sheet.columns = [
            { header: 'Número', key: 'numero', width: 15 },
            { header: 'Status Pagamento', key: 'statusPagamento', width: 15 },
            { header: 'Usuário', key: 'usuario', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Login', key: 'login', width: 20 },
            { header: 'CPF', key: 'cpf', width: 20 },
            { header: 'Curso', key: 'curso', width: 25 },
            { header: 'Clube', key: 'clube', width: 25 },
            { header: 'Descrição Período', key: 'descricaoPeriodo', width: 30 },
            { header: 'Data Início Período', key: 'dataInicioPeriodo', width: 20 },
            { header: 'Data Fim Período', key: 'dataFimPeriodo', width: 20 },
            { header: 'Valor Pedido', key: 'valorPedido', width: 15 },
            { header: 'Valor Pago', key: 'valorPago', width: 15 },
            { header: 'Data Pagamento', key: 'dataPagamento', width: 20 },
            { header: 'Data do Pedido', key: 'dataPedido', width: 20 },
        ];

        pedidos.forEach((pedido) => {
            sheet.addRow({
                numero: pedido.numero,
                statusPagamento: pedido.statusPagamento,
                usuario: pedido.usuario?.nome,
                email: pedido.usuario?.email,
                login: pedido.usuario?.login,
                cpf: pedido.usuario?.cpf,
                curso: pedido.usuario?.curso?.descricao,
                clube: pedido.periodoInscricao?.clube?.descricao,
                descricaoPeriodo: pedido.periodoInscricao?.descricao,
                dataInicioPeriodo: pedido.periodoInscricao?.dataInicio.toLocaleDateString('pt-BR'),
                dataFimPeriodo: pedido.periodoInscricao?.dataFim.toLocaleDateString('pt-BR'),
                valorPedido: pedido.valorPedido.toFixed(2),
                valorPago: pedido.valorPago?.toFixed(2) ?? '',
                dataPagamento: pedido.dataPagamento?.toLocaleDateString('pt-BR') ?? '',
                dataPedido: pedido.dataPedido.toLocaleDateString('pt-BR'),
            });
        });

        const uint8Array = await workbook.xlsx.writeBuffer();
        const nodeBuffer = Buffer.from(uint8Array);
        return nodeBuffer;

    }
}
