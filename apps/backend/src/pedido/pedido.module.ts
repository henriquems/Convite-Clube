import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { DbModule } from 'src/db/db.module';
import { PedidoPrisma } from './pedido.prisma';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [PedidoController],
  providers: [PedidoPrisma],
})
export class PedidoModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(PedidoController)
  }
}