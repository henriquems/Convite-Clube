import { Injectable } from '@nestjs/common';
import { AtualizarBoleto, Boleto, CadastrarBoleto, RecuperarUltimoBoletoDoPedido } from '@conviteclube/core';
import { BoletoPrisma } from './boleto.prisma';

@Injectable()
export class BoletoService {
  constructor(private readonly repositorio: BoletoPrisma) {}

  async executar(boleto: Boleto): Promise<number> {
    const casoDeUso = new CadastrarBoleto(this.repositorio);
    return await casoDeUso.executar(boleto);
  }

  async recuperarUltimoBoletoDoPedido(idPedido: number) {
    const casoDeUso = new RecuperarUltimoBoletoDoPedido(this.repositorio);
    return await casoDeUso.executar({ idPedido });
  }

  async atualizar(boleto: Boleto): Promise<number> {
    const casoDeUso = new AtualizarBoleto(this.repositorio);
    return await casoDeUso.executar(boleto);
  }
}