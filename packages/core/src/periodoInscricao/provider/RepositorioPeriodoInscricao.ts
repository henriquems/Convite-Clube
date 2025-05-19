import { Usuario } from "../../usuario";
import PeriodoInscricao from "../model/PeriodoInscricao"

export default interface RepositorioPeriodoInscricao {
    listar(page: string, tamanho: string): Promise<{ total: number, data: PeriodoInscricao[] }>;
    listarPeriodosProUsuario(page: string, tamanho: string, usuario: Usuario ): Promise<{ total: number, data: PeriodoInscricao[] }>;
    recuperar(id: number): Promise<PeriodoInscricao | null>
    salvar(periodoInscricao: PeriodoInscricao): Promise<void>
    excluir(id: number): Promise<void>
}