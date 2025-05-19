export class ErroAplicacao extends Error {
    public readonly codigo: string;

    constructor(codigo: string, mensagem: string) {
        super(mensagem);
        this.codigo = codigo;
    }
}