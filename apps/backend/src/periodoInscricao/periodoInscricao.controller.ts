import { Body, Controller, Post, Get, Delete, Param, Query } from '@nestjs/common';
import { PeriodoInscricaoPrisma } from './periodoInscricao.prisma';
import { CadastrarPeriodoInscricao, ExcluirPeriodoInscricao, ListarPeriodoInscricao, ListarPeriodoInscricaoProUsuario, PeriodoInscricao, RecuperarPeriodoInscricao, Usuario } from '@conviteclube/core';
import { UsuarioLogado } from 'src/shared/usuario.decorator';

@Controller('periodosInscricoes')
export class PeriodoInscricaoController {
    constructor(private readonly repositorio: PeriodoInscricaoPrisma){}

    @Get()
    async listar(@Query("page") page: string, @Query("pageSize") pageSize: string) {
        const casoDeUso = new ListarPeriodoInscricao(this.repositorio);
        const resultado = await casoDeUso.executar({ page, pageSize });
    
        return {
            total: resultado.total,
            periodoInscricoes: resultado.data
        };
    }
    
    @Get('/convite')
    async listarPeriodosProUsuario(@Query("page") page: string, @Query("pageSize") pageSize: string, @UsuarioLogado() usuario: Usuario) {
        const casoDeUso = new ListarPeriodoInscricaoProUsuario(this.repositorio);
        const resultado = await casoDeUso.executar({ page, pageSize, usuario});
    
        return {
            total: resultado.total,
            periodoInscricoes: resultado.data
        };
    }

    @Get('/:id')
    async recuperar(@Param('id') id: string) {
        const casoDeUso = new RecuperarPeriodoInscricao(this.repositorio);
        return await casoDeUso.executar({id: Number(id)});
    }

    @Post('/cadastro')
    async cadastrar(@Body() periodoInscricao: PeriodoInscricao) {
        const casoDeUso = new CadastrarPeriodoInscricao(this.repositorio);
        await casoDeUso.executar(periodoInscricao);
    }

    @Delete('/:id')
    async excluir(@Param('id') id: number) {
        const casoDeUso = new ExcluirPeriodoInscricao(this.repositorio);
        await casoDeUso.executar({id});
    }
}
