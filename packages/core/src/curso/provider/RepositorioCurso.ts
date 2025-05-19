import Curso from "../model/Curso";

export default interface RepositorioCurso {
    listar(): Promise<Curso[] | null>
}