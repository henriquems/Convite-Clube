'use client'
import ContextoSessao from "@/data/contexts/ContextoSessao"
import { IconUser } from "@tabler/icons-react"
import { useContext } from "react"
import { IconePerfil } from "./IconePerfil"

export default function UsuarioLogado() {
    const { usuario } = useContext(ContextoSessao)

    return (
        <div className="flex items-center justify-end w-full gap-0.5">
            <IconePerfil perfis={usuario?.perfis} mostrarTodos={false} />
            <span className="text-xs text-zinc-400">{usuario?.login}</span>
        </div>
    )
}