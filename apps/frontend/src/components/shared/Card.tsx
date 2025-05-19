import { IconChevronLeft } from "@tabler/icons-react"
import Link from "next/link"

export interface CardProps {
    icon?: any
    titulo?: string
    descricaoLink?: string
    caminhoLink?: string
    children: React.ReactNode
    tamanho?: "pequeno" | "grande"
} 

export default function Card(props: CardProps) {
    return (
        <div className={`
            flex flex-col items-center bg-zinc-200/60 rounded-lg
            border border-zinc-200 p-6 mt-5 mb-3
            ${props.tamanho === 'pequeno' ? 'w-[32%]' : 'w-full'}
        `}>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between text-zinc-400 
                    text-sm font-light border-b border-b-zinc-200/60 pb-3">
                    <div className="flex items-center gap-1">
                        {props.icon ? props.icon : ""}
                        {props.titulo}
                    </div>
                    <div className="flex items-center">
                        {!props.descricaoLink ? null : (
                            <Link href={props.caminhoLink ?? ""} className="flex gap-1 link">
                                <IconChevronLeft width={20} height={20} stroke={1.5} />
                                {props.descricaoLink}
                            </Link>
                        )}    
                    </div>
                </div>
                <div className="mt-2">{props.children}</div>
            </div>
        </div>
    )
}