import { Clube, RepositorioClube } from '@conviteclube/core';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ClubePrisma implements RepositorioClube {
    constructor(private readonly prisma: PrismaService){}

    listar(): Promise<Clube[]> {
        return this.prisma.clube.findMany({
            orderBy: {
                descricao: 'asc'
            }
        });
    }
}