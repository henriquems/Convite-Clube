import { Controller, Get } from '@nestjs/common';
import { ClubePrisma } from './clube.prisma';
import { ListarClube } from '@conviteclube/core';

@Controller('clubes')
export class ClubeController {
    constructor(private readonly repositorio: ClubePrisma){}

    @Get()
    async listar() {
        const casoDeUso = new ListarClube(this.repositorio);
        return await casoDeUso.executar();
    }     
}
