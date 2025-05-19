import { Body, Controller, Post, Get, Param, Put, } from '@nestjs/common';
import { BoletoPrisma } from './boleto.prisma';
import { Boleto, CadastrarBoleto, RecuperarBoleto, RecuperarUltimoBoletoDoPedido } from '@conviteclube/core';
import { BoletoService } from './boleto.service';


@Controller('boletos')
export class BoletoController {
    constructor(
        private readonly repositorio: BoletoPrisma,
        private readonly boletoService: BoletoService
    ){}
    
    @Post('/cadastro')
    async cadastrar(@Body() boleto: Boleto) {
        const casoDeUso = new CadastrarBoleto(this.repositorio);
        return await casoDeUso.executar(boleto);
    }

    @Get('/:id')
    async recuperar(@Param('id') id: string) {
        const casoDeUso = new RecuperarBoleto(this.repositorio);
        return await casoDeUso.executar({id: Number(id)});
    }

    @Get('/pedido/:id')
    async recuperarUltimoBoletoDoPedido(@Param('id') idPedido: string) {
        return this.boletoService.recuperarUltimoBoletoDoPedido(Number(idPedido));
    }

    @Post()
    async cadastrarAPI(@Body() boleto: Boleto): Promise<number> {
        return this.boletoService.executar(boleto);
    }

    @Put()
    async atualizarAPI(@Body() boleto: Boleto): Promise<number> {
        return this.boletoService.atualizar(boleto);
    }

}
