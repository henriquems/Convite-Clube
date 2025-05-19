'use client'
import ContextoSessao from "@/data/contexts/ContextoSessao"
import { IconUser } from "@tabler/icons-react"
import { useContext } from "react"

export default function UsuarioLogado() {
    const { usuario } = useContext(ContextoSessao)
    
    return (
        <div className="flex items-center justify-end w-full">
            <IconUser width={14} height={14} className="text-zinc-400" />
            <span className="text-xs text-zinc-400">{usuario?.login}</span>
        </div>
    )
}