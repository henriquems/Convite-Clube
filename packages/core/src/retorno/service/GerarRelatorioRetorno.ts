
import CasoDeUso from "../../shared/CasoDeUso";
import RepositorioRetorno from "../provider/RepositorioRetorno";

type Entrada = {
    arquivo: string
    dataProcessamento: Date
}

export default class GerarRelatorioRetorno implements CasoDeUso<Entrada, Buffer> {
    constructor(private readonly repositorio: RepositorioRetorno) {}

    async executar(entrada: Entrada): Promise<Buffer> {
        const { arquivo, dataProcessamento } = entrada;
        return this.repositorio.gerarRelatorio(arquivo, dataProcessamento);
    }
}