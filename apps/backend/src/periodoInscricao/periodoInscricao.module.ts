import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PeriodoInscricaoController } from './periodoInscricao.controller';
import { DbModule } from 'src/db/db.module';
import { PeriodoInscricaoPrisma } from './periodoInscricao.prisma';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [PeriodoInscricaoController],
  providers: [PeriodoInscricaoPrisma],
})
export class PeriodoInscricaoModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(PeriodoInscricaoController)
  }
}