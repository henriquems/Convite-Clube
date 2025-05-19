import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RetornoController } from './retorno.controller';
import { DbModule } from 'src/db/db.module';
import { RetornoPrisma } from './retorno.prisma';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { AzureModule } from '../azure/azure.module';

@Module({
  imports: [DbModule, AuthModule, AzureModule],
  controllers: [RetornoController],
  providers: [RetornoPrisma],
})
export class RetornoModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(RetornoController)
  }
}