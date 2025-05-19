import { Module } from '@nestjs/common';
import { CursoController } from './curso.controller';
import { DbModule } from 'src/db/db.module';
import { CursoPrisma } from './curso.prisma';

@Module({
  imports: [DbModule],
  controllers: [CursoController],
  providers: [CursoPrisma]
})
export class CursoModule {}