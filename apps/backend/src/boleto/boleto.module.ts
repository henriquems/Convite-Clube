import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BoletoController } from './boleto.controller';
import { DbModule } from 'src/db/db.module';
import { BoletoPrisma } from './boleto.prisma';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { BoletoService } from './boleto.service';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [BoletoController],
  providers: [BoletoPrisma, BoletoService],
})
export class BoletoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(BoletoController);
  }
}