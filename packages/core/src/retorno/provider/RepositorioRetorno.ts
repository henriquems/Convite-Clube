import Retorno from "../model/Retorno";

export default interface RepositorioRetorno {
    listar(page: string, tamanho: string): Promise<{ total: number, data: Retorno[] }>;
    recuperar(id: number): Promise<Retorno | null>
    salvar(retorno: Retorno): Promise<void>;
    gerarRelatorio(arquivo: string, dataProcessamento: Date): Promise<Buffer>;
}