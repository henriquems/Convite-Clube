import CasoDeUso from "../../shared/CasoDeUso";
import Usuario from "../model/Usuario";
import ProvedorCriptografia from "../provider/ProvedorCriptografia";
import RepositorioUsuario from "../provider/RepositorioUsuario";

export default class CadastrarUsuario implements CasoDeUso<Usuario, void> {
    constructor(
        private readonly repositorio: RepositorioUsuario,
        private readonly cripto : ProvedorCriptografia){}

    async executar(usuario: Usuario): Promise<void> {
        const senhaCriptografada = await this.cripto.criptografar(usuario.senha)
       
        const novoUsuario = {
            ...usuario,
            senha:  senhaCriptografada
        }

        await this.repositorio.salvar(novoUsuario)
    }
}