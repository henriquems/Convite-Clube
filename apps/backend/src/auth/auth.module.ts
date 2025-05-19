import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { AuthPrisma } from './auth.prisma';
import { BcryptProvider } from '../shared/bcrypt.provider';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [AuthPrisma, BcryptProvider, AuthMiddleware],
  exports: [AuthMiddleware, AuthPrisma],
})
export class AuthModule {}
