'use client'
import { IconUserPlus } from "@tabler/icons-react"
import Link from "next/link"
import UsuarioLogado from "./UsuarioLogado"

export interface TituloPaginaProps {
    icone: React.ReactElement
    descricao: string
    entidade?: string
    labelBotao?: string
    urlBotao?: string
    quantidadeRegistros?: number
}

export default function TituloPagina(props: TituloPaginaProps) {
    return (
        <div className="mb-4">
            <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full gap-3">
                <div className="flex items-center">
                    <div className="flex gap-1">
                        <div className="flex items-center gap-1">
                            <span className="text-green-700">{props.icone}</span>
                            <span className="text-green-700 font-light text-sm">{props.descricao}</span>
                        </div>
                        <div>
                            { props.quantidadeRegistros !== 0 && 
                                <span className="text-zinc-400 font-light text-xs">
                                    {  props.quantidadeRegistros } { props.entidade }
                                </span>
                            }
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center justify-between lg:justify-end gap-5">
                        <div>
                            <UsuarioLogado />
                        </div>
                        <div>
                            { props.labelBotao && 
                                <Link href={props.urlBotao ?? ""} 
                                    className="flex items-center justify-center 
                                        gap-1 p-2
                                        text-xs font-semibold text-green-700 
                                        hover:text-green-800 rounded-lg border 
                                        border-green-700 hover:bg-zinc-50">
                                    <IconUserPlus width={18} height={18} stroke={2} />
                                    {props.labelBotao}
                                </Link> 
                            }
                        </div>
                    </div>
                </div>                    
            </div>
        </div>
    )
}

