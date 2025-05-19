import CasoDeUso from "../../shared/CasoDeUso";
import Boleto from "../model/Boleto";
import RepositorioBoleto from "../provider/RepositorioBoleto";

export default class AtualizarBoleto implements CasoDeUso<Boleto, number> {
    constructor(private readonly repositorio: RepositorioBoleto){}

    async executar(boleto: Boleto): Promise<number> {    
        return await this.repositorio.atualizar(boleto);;
    }
}