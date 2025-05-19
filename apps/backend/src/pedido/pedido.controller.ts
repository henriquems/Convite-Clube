import { Body, Controller, Post, Get, Delete, Param, Query, Header, StreamableFile } from '@nestjs/common';
import { PedidoPrisma } from './pedido.prisma';
import { CadastrarPedido, ExcluirPedido, FiltroRelatorioPedidoDto, GerarRelatorioPedido, LimiteConvitesExcedido, ListarPedido, Pedido, RecuperarPedido, Usuario, } from '@conviteclube/core';
import { UsuarioLogado } from 'src/shared/usuario.decorator';
import { BadRequestException } from '@nestjs/common';
import { Readable } from 'stream';

@Controller('pedidos')
export class PedidoController {
    constructor(private readonly repositorio: PedidoPrisma){}

    @Get()
    async listar(@Query("page") page: string, @Query("pageSize") pageSize: string, @UsuarioLogado() usuarioLogado: Usuario) {
        const usuario = {
            id: usuarioLogado.id!,
            perfis: (usuarioLogado.perfis || []).map(perfil => perfil.nome),
        };
    
        const casoDeUso = new ListarPedido(this.repositorio);
        const resultado = await casoDeUso.executar({ page, pageSize, usuario });
    
        return {
            total: resultado.total,
            pedidos: resultado.data
        };
    }      

    @Get('/:id')
    async recuperar(@Param('id') id: string) {
        const casoDeUso = new RecuperarPedido(this.repositorio);
        return await casoDeUso.executar({id: Number(id)});
    }

    @Post('/cadastro')
    async cadastrar(@Body() pedido: Pedido) {
        const casoDeUso = new CadastrarPedido(this.repositorio);

        try {
            await casoDeUso.executar(pedido);
        } catch (erro) {
            if (erro instanceof LimiteConvitesExcedido) {
                throw new BadRequestException(erro.message);
            }
            throw erro;
        }
    }

    @Delete('/:id')
    async excluir(@Param('id') id: number) {
        const casoDeUso = new ExcluirPedido(this.repositorio);
        await casoDeUso.executar({id});
    }

    @Post('relatorio')
    @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    @Header('Content-Disposition', 'attachment; filename=relatorio_pedidos.xlsx')
    async gerarRelatorioPedidos(@Body() filtros: FiltroRelatorioPedidoDto): Promise<StreamableFile> {
        const casoDeUso = new GerarRelatorioPedido(this.repositorio);
        const buffer = await casoDeUso.executar(filtros); // Garantir que o buffer seja válido
        const stream = Readable.from(buffer);
        return new StreamableFile(stream);
    }
}
