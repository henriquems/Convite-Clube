import { Boleto, RepositorioBoleto, StatusBoleto, StatusEnvio, StatusPagamento, StatusUsuario } from '@conviteclube/core';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';


@Injectable()
export class BoletoPrisma implements RepositorioBoleto {
    constructor(private readonly prisma: PrismaService){}
  
    async quantidadeBoletosDoPedido(pedidoId: number): Promise<number> {
        return await this.prisma.boleto.count({
            where: { pedidoId }
        });
    }

    async existeBoletoGeradoParaPedido(pedidoId: number): Promise<boolean> {
        const boleto = await this.prisma.boleto.findFirst({
            where: {
            pedidoId: pedidoId,
            },
            select: {
            id: true,
            },
        });
        
        return boleto !== null;
    }

    async recuperar(valor: number): Promise<Boleto | null> {
        const id = Number(valor);

        const boleto = await this.prisma.boleto.findUnique({
            where: { id },
            include: {
                pedido: {
                    include: {
                        usuario: true,
                        periodoInscricao: {
                            include: {
                                clube: true,
                            },
                        },
                    },
                },
            },
        });
        if (!boleto) return null;

        return {
            ...boleto,
            valor: Number(boleto.valor.toFixed(2)),
            statusBoleto: boleto.statusBoleto as StatusBoleto,
            statusEnvio: boleto.statusEnvio as StatusEnvio,
            pedido: {
                ...boleto.pedido,
                statusPagamento: boleto.pedido.statusPagamento as StatusPagamento,
                valorPedido: Number(boleto.pedido.valorPedido.toFixed(2)),
                valorPago: boleto.pedido.valorPago ? Number(boleto.pedido.valorPago.toFixed(2)) : null,
                usuario: {
                    ...boleto.pedido.usuario,
                    status: boleto.pedido.usuario.status as StatusUsuario,
                },
                periodoInscricao: {
                    ...boleto.pedido.periodoInscricao,
                    valorConvite: Number(boleto.pedido.periodoInscricao.valorConvite),
                },
            },
        };
    }

    async recuperarUltimoBoletoDoPedido(idPedido: number): Promise<Boleto | null> {
        const boleto = await this.prisma.boleto.findFirst({
            where: { pedidoId: idPedido },
            include: {
                pedido: {
                    include: {
                        usuario: true,          
                        periodoInscricao: {
                            include: {
                                clube: true, 
                            },
                        },
                    },
                },
            },
            orderBy: {
                dataBoleto: 'desc',
            },
        });

        if (!boleto) return null;

        return {
            ...boleto,
            pedido: {
                ...boleto.pedido,
                valorPedido: boleto.pedido.valorPedido.toNumber(),
                valorPago: boleto.pedido.valorPago?.toNumber() ?? null,
                statusPagamento: boleto.pedido.statusPagamento as StatusPagamento,
                usuario: {
                    ...boleto.pedido.usuario,
                    status: boleto.pedido.usuario.status as StatusUsuario,
                },
                periodoInscricao: {
                    ...boleto.pedido.periodoInscricao,
                    valorConvite: boleto.pedido.periodoInscricao.valorConvite.toNumber(),
                    clube: boleto.pedido.periodoInscricao.clube,
                },
            },
            statusBoleto: boleto.statusBoleto as StatusBoleto,
            statusEnvio: boleto.statusEnvio as StatusEnvio,
        };
    }

    async atualizar(boleto: Boleto): Promise<number> {
        if (!boleto.id) throw new Error('ID do boleto não informado para atualização.');
        
        const boletoAtualizado = await this.prisma.boleto.update({
            where: {
                id: boleto.id,
            },
            data: {
                tipoPagamento: boleto.tipoPagamento,
                statusEnvio: boleto.statusEnvio,
            },
        });
    
        return boletoAtualizado.id;
    }

    async salvar(boleto: Boleto): Promise<number> {
        const boletoSalvo = await this.prisma.boleto.upsert({
            where: {
                id: boleto.id ?? 0,
            },
            update: {
                pedido: {
                    connect: {
                        id: boleto.pedido.id,
                    },
                },
                identificadorConvenio: boleto.identificadorConvenio,
                referenciaTransacao: boleto.referenciaTransacao,
                valor: boleto.valor,
                quantidadePonto: boleto.quantidadePonto,
                tipoPagamento: boleto.tipoPagamento,
                cpfCnpj: boleto.cpfCnpj,
                indicadorPessoa: boleto.indicadorPessoa,
                valorDesconto: boleto.valorDesconto,
                dataLimiteDesconto: boleto.dataLimiteDesconto,
                tipoDuplicata: boleto.tipoDuplicata,
                urlRetorno: boleto.urlRetorno,
                urlInforma: boleto.urlInforma,
                nome: boleto.nome,
                endereco: boleto.endereco,
                cidade: boleto.cidade,
                estado: boleto.estado,
                cep: boleto.cep,
                mensagem: boleto.mensagem,
                statusBoleto: boleto.statusBoleto,
                statusEnvio: boleto.statusEnvio,
                valorPagamento: boleto.valorPagamento,
                tarifaBancaria: boleto.tarifaBancaria,
                dataVencimento: boleto.dataVencimento,
                dataPagamento: boleto.dataPagamento,
                dataBoleto: boleto.dataBoleto,
            },
            create: {
                pedido: {
                    connect: {
                        id: boleto.pedido.id,
                    },
                },
                identificadorConvenio: boleto.identificadorConvenio,
                referenciaTransacao: boleto.referenciaTransacao,
                valor: boleto.valor,
                quantidadePonto: boleto.quantidadePonto,
                tipoPagamento: boleto.tipoPagamento,
                cpfCnpj: boleto.cpfCnpj,
                indicadorPessoa: boleto.indicadorPessoa,
                valorDesconto: boleto.valorDesconto,
                dataLimiteDesconto: boleto.dataLimiteDesconto,
                tipoDuplicata: boleto.tipoDuplicata,
                urlRetorno: boleto.urlRetorno,
                urlInforma: boleto.urlInforma,
                nome: boleto.nome,
                endereco: boleto.endereco,
                cidade: boleto.cidade,
                estado: boleto.estado,
                cep: boleto.cep,
                mensagem: boleto.mensagem,
                statusBoleto: boleto.statusBoleto,
                statusEnvio: boleto.statusEnvio,
                valorPagamento: boleto.valorPagamento,
                tarifaBancaria: boleto.tarifaBancaria,
                dataVencimento: boleto.dataVencimento,
                dataPagamento: boleto.dataPagamento,
                dataBoleto: boleto.dataBoleto,
            }
        });
    
        return boletoSalvo.id;
    }
}
