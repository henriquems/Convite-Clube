import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DbModule } from './db/db.module';
import { PerfilModule } from './perfil/perfil.module';
import { PeriodoInscricaoModule } from './periodoInscricao/periodoInscricao.module';
import { ClubeModule } from './clube/clube.module';
import { PedidoModule } from './pedido/pedido.module';
import { BoletoModule } from './boleto/boleto.module';
import { RetornoModule } from './retorno/retorno.module'
import { CursoModule } from './curso/curso.module';
import { RegulamentoModule } from './regulamento/regulamento.module';

@Module({
  imports: [AuthModule, UsuarioModule, PerfilModule, DbModule, 
    PeriodoInscricaoModule, ClubeModule, PedidoModule, BoletoModule, 
    RetornoModule, CursoModule, RegulamentoModule ],
  controllers: [AppController],
})
export class AppModule {}
