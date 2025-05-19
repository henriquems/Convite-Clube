import { Module } from '@nestjs/common';
import { RegulamentoController } from './regulamento.controller';
import { AzureModule } from 'src/azure/azure.module';

@Module({
  imports: [AzureModule],
  controllers: [RegulamentoController],
})
export class RegulamentoModule {}