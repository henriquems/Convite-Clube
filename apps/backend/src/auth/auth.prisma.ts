import { Injectable } from '@nestjs/common';
import { RepositorioAuth, RepositorioUsuario, StatusUsuario, Usuario } from '@conviteclube/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AuthPrisma implements RepositorioAuth {
    constructor(private readonly prisma: PrismaService){}

    async logar(login: string): Promise<Usuario | null> {
        const usuario = await this.prisma.usuario.findUnique({
            where: { 
                login, 
                status: StatusUsuario.ATIVO
            },
            include: {
                perfis: {
                    select: { id: true, nome: true, descricao: true }
                }
            }
        });
    
        if (!usuario) return null;
    
        return {
            ...usuario,
            status: usuario.status as StatusUsuario,
        };
    }
    
}
