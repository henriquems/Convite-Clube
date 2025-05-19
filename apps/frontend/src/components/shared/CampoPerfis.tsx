import usePerfis from "@/data/hooks/usePerfil"
import { Perfil } from "@conviteclube/core"
import React from "react"

export interface CampoPerfisProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
    value: Perfil[]
    onChange: (value: Perfil[]) => void
} 

export default function CampoPerfis(props: CampoPerfisProps) {
    const { perfis } = usePerfis()

    function onChange(e: React.ChangeEvent<HTMLInputElement>, perfil: Perfil) {
        const novosValores = props.value.filter(p => p.id !== perfil.id)
        props.onChange(e.target.checked ? [...novosValores, perfil] : novosValores) 
    }

    return (
        <div className="grid grid-cols-4
            px-4 h-11 w-full bg-zinc-50 
            rounded-md border border-zinc-300">
            { perfis.map((perfil) => {
                return (
                    <div key={perfil.id} className="flex items-center gap-2">
                        <input 
                            type="checkbox"
                            checked={!!props.value.find((v) => v.id === perfil.id)} 
                            onChange={(e) => onChange(e, perfil)} 
                        />
                        <span className="text-zinc-500 text-sm">{perfil.nome}</span>
                    </div>
                )
            })}
        </div>
    )
}
