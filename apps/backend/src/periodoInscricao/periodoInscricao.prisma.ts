import { PeriodoInscricao, RepositorioPeriodoInscricao, Usuario } from '@conviteclube/core';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';


@Injectable()
export class PeriodoInscricaoPrisma implements RepositorioPeriodoInscricao {
    constructor(private readonly prisma: PrismaService){}

    async listar(page: string, pageSize: string): Promise<{ total: number, data: PeriodoInscricao[] }> {
        const pag = parseInt(page);
        const tam = parseInt(pageSize);
    
        const [total, data] = await this.prisma.$transaction([
            this.prisma.periodoInscricao.count(),
            this.prisma.periodoInscricao.findMany({
                skip: (pag - 1) * tam,
                take: tam,
                include: {
                    clube: true,
                },
                orderBy: {
                    id: "desc"
                }
            })
        ]);
    
        return {
            total,
            data: data.map((p) => ({
              ...p,
              valorConvite: Number(p.valorConvite.toFixed(2)),
            })),
        };
    }

    async listarPeriodosProUsuario(page: string, pageSize: string, usuario: Usuario): Promise<{ total: number, data: PeriodoInscricao[] }> {
        const pag = parseInt(page);
        const tam = parseInt(pageSize);
        const hoje = new Date();
    
        const [_, rawData] = await this.prisma.$transaction([
            this.prisma.periodoInscricao.count({
                where: {
                    AND: [
                        { dataInicio: { lte: hoje } },
                        { dataFim: { gte: hoje } },
                        {
                            pedidos: {
                                none: {
                                    usuarioId: usuario.id,
                                }
                            }
                        }
                    ]
                }
            }),
            this.prisma.periodoInscricao.findMany({
                where: {
                    AND: [
                        { dataInicio: { lte: hoje } },
                        { dataFim: { gte: hoje } },
                        {
                            pedidos: {
                                none: {
                                    usuarioId: usuario.id,
                                }
                            }
                        }
                    ]
                },
                include: {
                    clube: true,
                    _count: {
                        select: {
                            pedidos: true
                        }
                    }
                },
                orderBy: {
                    id: "desc"
                }
            })
        ]);
    
        const filtrados = rawData
            .map(p => ({
                ...p,
                valorConvite: Number(p.valorConvite.toFixed(2)),
                quantidadePedidos: p._count.pedidos,
                quantidadeConvitesRestantes: p.quantidadeConvite - p._count.pedidos
            }))
            .filter(p => p.quantidadeConvitesRestantes > 0);
    
        const total = filtrados.length;
        const paginados = filtrados.slice((pag - 1) * tam, pag * tam);
    
        return {
            total,
            data: paginados
        };
    }

    async recuperar(valor: number): Promise<PeriodoInscricao | null> {
        const id = Number(valor);

        const periodo = await this.prisma.periodoInscricao.findUnique({
            where: { id },
            include: {
                clube: true,
            },
        });

        if (!periodo) return null;

        return {
            ...periodo,
            valorConvite: Number(periodo.valorConvite.toFixed(2)), 
        };
    }

    async excluir(valor: number): Promise<void> {
        await this.prisma.periodoInscricao.delete({
          where: { id: Number(valor) },
        });
    }

    async salvar(periodoInscricao: PeriodoInscricao): Promise<void> {
        await this.prisma.periodoInscricao.upsert({
            where: {
                id: periodoInscricao.id ? periodoInscricao.id : 0
            },
            create: {
                clube: {
                    connect: {
                      id: periodoInscricao.clube.id,
                    },
                  },
                descricao: periodoInscricao.descricao,
                dataInicio: periodoInscricao.dataInicio,
                dataFim: periodoInscricao.dataFim,
                quantidadeConvite: Number(periodoInscricao.quantidadeConvite),
                valorConvite: Number(periodoInscricao.valorConvite),
                dataLimitePagamento: periodoInscricao.dataLimitePagamento,
            },
            update: {
                clube: {
                    connect: {
                      id: periodoInscricao.clube.id,
                    },
                },
                descricao: periodoInscricao.descricao,
                dataInicio: periodoInscricao.dataInicio,
                dataFim: periodoInscricao.dataFim,
                quantidadeConvite: Number(periodoInscricao.quantidadeConvite),
                valorConvite: Number(periodoInscricao.valorConvite),
                dataLimitePagamento: periodoInscricao.dataLimitePagamento,
            }
        })
    }
}
