import { Injectable } from '@nestjs/common';
import { RepositorioCurso, Curso } from '@conviteclube/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class CursoPrisma implements RepositorioCurso {
    constructor(private readonly prisma: PrismaService){}

    async listar(): Promise<Curso[] | null> {
        return this.prisma.curso.findMany()
    }
}