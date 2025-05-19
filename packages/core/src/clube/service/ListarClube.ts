import CasoDeUso from "../../shared/CasoDeUso";
import Clube from "../model/Clube";
import RepositorioClube from "../provider/RepositorioClube";

export default class ListarClube implements CasoDeUso<void, Clube[]> {
    constructor(private readonly repositorio: RepositorioClube){}

    async executar(): Promise<Clube[]> {
        return this.repositorio.listar();
    }
}