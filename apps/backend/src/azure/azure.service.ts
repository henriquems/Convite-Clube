import { Injectable } from '@nestjs/common';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable()
export class AzureService {
    private blobServiceClient: BlobServiceClient;
    private readonly connectionString = process.env.CONECTION_BLOB_AZURE
    constructor() {
        this.blobServiceClient = BlobServiceClient.fromConnectionString(this.connectionString);
    }

    async downloadFile(containerName: string, fileName: string): Promise<{ stream: NodeJS.ReadableStream; contentType: string }> {
        const containerClient: ContainerClient = this.blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(fileName);

        const exists = await blobClient.exists();
        if (!exists) {
            throw new Error(`Arquivo "${fileName}" não encontrado no container "${containerName}"`);
        }

        const downloadResponse = await blobClient.download();

        const stream = downloadResponse.readableStreamBody;
        if (!stream) {
            throw new Error(`Falha ao obter stream do arquivo "${fileName}"`);
        }

        return {
            stream,
            contentType: downloadResponse.contentType || 'application/octet-stream',
        }
    }

}