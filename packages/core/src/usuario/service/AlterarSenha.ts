
import CasoDeUso from "../../shared/CasoDeUso"
import Usuario from "../model/Usuario"
import RepositorioUsuario from "../provider/RepositorioUsuario"

type Entrada = {
    idUsuario: number
    novaSenha: string
}

export default class AlterarSenha implements CasoDeUso<Entrada, string> {
    constructor(private readonly repositorio: RepositorioUsuario){}
    
    async executar(entrada: Entrada): Promise<string> {
        const { novaSenha, idUsuario } = entrada
        if(!idUsuario) throw new Error('Usuário não encontrado!')
        return await this.repositorio.alterarSenha(novaSenha, idUsuario);
    }
}