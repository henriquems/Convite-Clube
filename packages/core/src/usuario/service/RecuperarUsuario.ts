import Usuario from "../model/Usuario";
import CasoDeUso from "../../shared/CasoDeUso";
import RepositorioUsuario from "../provider/RepositorioUsuario";

type Entrada = {
    id: number
}

export default class RecuperarUsuario implements CasoDeUso<Entrada, Usuario> {
    constructor(private readonly repositorio: RepositorioUsuario){}
    
    async executar(entrada: Entrada): Promise<Usuario> {
        const { id } = entrada
        if(!id) throw new Error('Usuário não encontrado!')
        return await this.repositorio.recuperar(id)
    }
}