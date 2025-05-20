import { Perfil } from "@conviteclube/core"
import { IconSchool, IconUserCog, IconUserDollar } from "@tabler/icons-react"

interface IconePerfilProps {
    perfis?: Partial<Perfil>[]
    mostrarTodos?: boolean
}

export const IconePerfil: React.FC<IconePerfilProps> = ({ perfis = [], mostrarTodos = false }) => {
    if (!perfis.length) return null

    const prioridade = ["ADMINISTRADOR", "FINANCEIRO", "ALUNO"]

    const renderPerfil = (nome: string | undefined) => {
        if (!nome) return null

        switch (nome) {
            case "ADMINISTRADOR":
                return <IconUserCog width={16} height={16} className="text-zinc-400" />
            case "FINANCEIRO":
                return <IconUserDollar width={16} height={16} className="text-zinc-400" />
            case "ALUNO":
                return <IconSchool width={16} height={16} className="text-zinc-400" />
            default:
                return null
        }
    }

    if (mostrarTodos) {
        return (
            <div className="flex gap-2 justify-center items-end">
                {perfis.map(p => renderPerfil(p.nome))}
            </div>
        )
    }

    const nomePerfilPrioritario = prioridade.find(nome => perfis.some(p => p.nome === nome))
    
    return (
        <div className="flex justify-center items-end">
        {nomePerfilPrioritario ? renderPerfil(nomePerfilPrioritario) : null}
        </div>
    )
}