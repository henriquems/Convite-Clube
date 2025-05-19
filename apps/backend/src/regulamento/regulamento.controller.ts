import { Controller, Get, Param, Res } from '@nestjs/common';
import { AzureService } from '../azure/azure.service';
import { Response } from 'express';

@Controller('regulamento')
export class RegulamentoController {
    constructor(private readonly azureService: AzureService) {}

    @Get(':clube')
    async download(@Param('clube') clube: string, @Res() res: Response) {
        const container = 'conviteclube-arquivo';
        const fileName = clube === 'cruzeiro' ? 'regulamentoCruzeiro.pdf' : 'regulamentoAtletico.pdf';

        const { stream, contentType } = await this.azureService.downloadFile(container, fileName);

        res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
        res.setHeader('Content-Type', contentType);

        stream.pipe(res);
    }
}