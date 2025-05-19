import { Controller, Post, Res, Get, Param, Query, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { RetornoPrisma } from './retorno.prisma';
import { ListarRetorno, CadastrarRetorno, RecuperarRetorno, Usuario, GerarRelatorioRetorno, RelatorioRetornoEntrada } from '@conviteclube/core';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuarioLogado } from 'src/shared/usuario.decorator';
import { Response } from 'express';
import { Logger } from '@nestjs/common';
const logger = new Logger('RetornoController');

@Controller('retornos')
export class RetornoController {
    constructor(private readonly repositorio: RetornoPrisma){}

    @Get()
    async listar(@Query("page") page: string, @Query("pageSize") pageSize: string) {
        const casoDeUso = new ListarRetorno(this.repositorio);
        const resultado = await casoDeUso.executar({ page, pageSize });
    
        return {
            total: resultado.total,
            retornos: resultado.data
        };
    }

    @Get('/:id')
    async recuperar(@Param('id') id: string) {
        const casoDeUso = new RecuperarRetorno(this.repositorio);
        return await casoDeUso.executar({id: Number(id)});
    }
    
    @Post('/cadastro')
    @UseInterceptors(FileInterceptor('file'))
    async cadastrar(@UploadedFile() arquivo: Express.Multer.File, @UsuarioLogado() usuario: Usuario) {
        const casoDeUso = new CadastrarRetorno(this.repositorio);
        const resultado = await casoDeUso.executar({ arquivo, usuario });
    }

    @Post('/relatorio')
    async gerarRelatorio(@Body() relatorioRetorno: RelatorioRetornoEntrada, @Res() res: Response) {
        try {
            const { arquivo, dataProcessamento } = relatorioRetorno;
            const data = new Date(dataProcessamento);

            const casoDeUso = new GerarRelatorioRetorno(this.repositorio);
            const pdfBuffer = await casoDeUso.executar({
            arquivo,
            dataProcessamento: data,
            });

            res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="relatorio.pdf"',
            'Content-Length': pdfBuffer.length,
            });

            res.send(pdfBuffer);
        } catch (err) {
            logger.error('Erro ao gerar relatório:', err);
            res.status(500).json({ message: 'Erro interno ao gerar o relatório' });
        }
    }

}
