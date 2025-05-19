export class HttpErro extends Error {
    status: number;
    dados: any;

    constructor(status: number, dados: any) {
        super(dados?.message || 'Erro HTTP');
        this.status = status;
        this.dados = dados;
        Object.setPrototypeOf(this, HttpErro.prototype);
    }
}