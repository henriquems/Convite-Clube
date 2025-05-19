import CasoDeUso from "../../shared/CasoDeUso";
import Curso from "../model/Curso";
import RepositorioPerfil from "../provider/RepositorioCurso";

export default class ListarCurso implements CasoDeUso<null, Curso[]> {
    constructor(private readonly repositorio: RepositorioPerfil){}

    async executar(): Promise<Curso[]> {
       return this.repositorio.listar();
    }
}