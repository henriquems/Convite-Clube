import { Injectable } from '@nestjs/common';
import { RepositorioUsuario, StatusUsuario, Usuario } from '@conviteclube/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsuarioPrisma implements RepositorioUsuario {
    constructor(private readonly prisma: PrismaService){}

    async listar(page: string, pageSize: string): Promise<{ total: number, data: Usuario[] }> {
        const pag = parseInt(page);
        const tam = parseInt(pageSize);
    
        const [total, data] = await this.prisma.$transaction([
            this.prisma.usuario.count(),
            this.prisma.usuario.findMany({
                skip: (pag - 1) * tam,
                take: tam,
                include: {
                    perfis: {
                        select: { id: true, nome: true, descricao: true }
                    }
                },
                orderBy: {
                    nome: "asc"
                }
            })
        ]);
    
        const usuarios: Usuario[] = data.map(usuario => ({
            ...usuario,
            status: usuario.status as StatusUsuario
        }));
    
        return { total, data: usuarios };
    }

    async recuperar(valor: number): Promise<Usuario | null> {
        const id = Number(valor)

        const usuario = await this.prisma.usuario.findUnique({
            where: { id },
            include: {
                perfis: {
                    select: { id: true, nome: true, descricao: true }
                }
            }
        })

        if (!usuario) return null;

        return {
            ...usuario,
            status: usuario.status as StatusUsuario
        };
    }

    async recuperarUsuariosDoCurso(cursoId: number): Promise<Usuario[]> {
        const usuarios = await this.prisma.usuario.findMany({
            where: { cursoId },
            include: {
                perfis: {
                    select: { id: true, nome: true, descricao: true }
                }
            }
        });

        return usuarios.map(usuario => ({
            ...usuario,
            status: usuario.status as StatusUsuario
        }));
    }

    async excluir(valor: number): Promise<void> {
        const id = Number(valor)

        await this.prisma.usuario.delete({
          where: { id },
          include: { perfis: true },
        });
    }

    async salvar(usuario: Usuario): Promise<void> {
        if (usuario.id) {
            await this.prisma.usuario.upsert({
                where: {
                    id: usuario.id,
                },
                create: {
                    nome: usuario.nome,
                    email: usuario.email,
                    login: usuario.login,
                    senha: usuario.senha,
                    cpf: usuario.cpf,
                    status: usuario.status,
                    perfis: {
                        connect: usuario.perfis.map((perfil) => ({ id: perfil.id })),
                    },
                },
                update: {
                    email: usuario.email,
                    login: usuario.login,
                    cpf: usuario.cpf,
                    status: usuario.status,
                    perfis: {
                        set: usuario.perfis.map((perfil) => ({ id: perfil.id }))
                    },
                },
            });
        } else {
            await this.prisma.usuario.create({
                data: {
                    nome: usuario.nome,
                    email: usuario.email,
                    login: usuario.login,
                    senha: usuario.senha,
                    cpf: usuario.cpf,
                    status: usuario.status,
                    perfis: {
                        connect: usuario.perfis.map((perfil) => ({ id: perfil.id })),
                    },
                },
            });
        }
    }

    async recuperarUsuarioPorEmail(email: string): Promise<Usuario | null> {
        const usuario = await this.prisma.usuario.findFirst({
            where: { email },
            include: {
                perfis: {
                    select: { id: true, nome: true, descricao: true }
                }
            }
        })

        if (!usuario) return null;

        return {
            ...usuario,
            status: usuario.status as StatusUsuario
        };
    }

    async alterarSenha(novaSenha: string, idUsuario: number): Promise<string> {
        const id = Number(idUsuario)
        const usuarioAlterado = await this.prisma.usuario.update({
            where: { id },
            data: { senha: novaSenha },
        });

        return usuarioAlterado.email
    }
}
