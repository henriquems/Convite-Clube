import CasoDeUso from "../../shared/CasoDeUso";
import RepositorioRetorno from "../provider/RepositorioRetorno";
import Retorno from "../model/Retorno";
import { Usuario } from "../../usuario";

type Entrada = {
  arquivo: Express.Multer.File;
  usuario: Usuario;
};

export default class CadastrarRetorno implements CasoDeUso<Entrada, string> {
    constructor(private readonly repositorio: RepositorioRetorno) {}

    async executar({ arquivo, usuario }: Entrada): Promise<string> {
        const conteudo = arquivo.buffer.toString('latin1');
        const linhas = conteudo.split(/\r?\n/).filter(l => l.trim() !== '');

        if (linhas.length === 0) {
          throw new Error('Arquivo vazio ou inválido.');
        }

        const nomeArquivo = arquivo.originalname;
        const dataProcessamento = new Date();
        const banco = linhas[0].substring(76, 79);

        for (const linha of linhas) {
            const retorno: Retorno = {
              arquivo: nomeArquivo,
              linha,
              usuario,
              dataProcessamento,
              banco,
            };

            await this.repositorio.salvar(retorno);
        }

        return 'Arquivo processado com sucesso!';
    }
}