'use client'
import { useRouter } from "next/navigation"
import useSessao from "@/data/hooks/useSessao"
import Processando from "./Processando"
import { useEffect } from "react"

export default function ForcarAutenticacao(props: any) {
    const { usuario, carregando  } = useSessao()
    const router = useRouter()

    useEffect(() => {
        if (!carregando && !usuario?.email) {
            router.push('/')
        }
    }, [carregando, usuario, router])

    if (carregando || !usuario?.email) {
        return <Processando />
    }

    return props.children
}