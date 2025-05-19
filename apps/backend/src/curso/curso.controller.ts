import { Body, Controller, Post, Get } from '@nestjs/common';
import { CursoPrisma } from './curso.prisma';
import { ListarCurso, Curso } from '@conviteclube/core';

@Controller('cursos')
export class CursoController {
    constructor(
        private readonly repositorio: CursoPrisma){}

    @Get()
    async listar() {
        const casoDeUso = new ListarCurso(this.repositorio);
        return await casoDeUso.executar();
    }
    
}
