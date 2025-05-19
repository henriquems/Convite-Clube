import CasoDeUso from "../../shared/CasoDeUso";
import Pedido from "../model/Pedido";
import RepositorioPedido from "../provider/RepositorioPedido";

type Entrada = {
    page: string
    pageSize: string
    usuario?: {
        id: number
        perfis: string[]
    }
}

type ResultadoListagem = {
    total: number;
    data: Pedido[];
};

export default class ListarPedido implements CasoDeUso<Entrada, ResultadoListagem> {
    constructor(private readonly repositorio: RepositorioPedido) {}

    async executar(entrada: Entrada): Promise<ResultadoListagem> {
        const { page, pageSize, usuario } = entrada;
        return this.repositorio.listar(page, pageSize, usuario);
    }
}