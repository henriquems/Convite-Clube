import Usuario from "../model/Usuario";
import CasoDeUso from "../../shared/CasoDeUso";
import RepositorioUsuario from "../provider/RepositorioUsuario";

type Entrada = {
    id: number
}

export default class RecuperarUsuarioDoCurso implements CasoDeUso<Entrada, Usuario[]> {
    constructor(private readonly repositorio: RepositorioUsuario){}
    
    async executar(entrada: Entrada): Promise<Usuario[]> {
        const { id } = entrada
        if(!id) throw new Error('Curso não encontrado!')
        return await this.repositorio.recuperarUsuariosDoCurso(id)
    }
}