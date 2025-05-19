import Clube from "../model/Clube"

export default interface RepositorioClube {
    listar(): Promise<Clube[]>
}