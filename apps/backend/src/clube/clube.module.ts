import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClubeController } from './clube.controller';
import { DbModule } from 'src/db/db.module';
import { ClubePrisma } from './clube.prisma';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [ClubeController],
  providers: [ClubePrisma],
})
export class ClubeModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(ClubeController)
  }
}