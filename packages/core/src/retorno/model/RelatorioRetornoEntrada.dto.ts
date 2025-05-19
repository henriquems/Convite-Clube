import { IsString, IsDate } from 'class-validator';

export class RelatorioRetornoEntrada {
    @IsString()
    arquivo: string;

    @IsDate()
    dataProcessamento: Date;
}