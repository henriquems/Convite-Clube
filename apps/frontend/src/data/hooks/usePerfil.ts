import { useCallback, useEffect, useState } from "react";
import { Perfil } from "@conviteclube/core";
import useAPI from "./useAPI";

export default function usePerfil() {
    const { httpGet } = useAPI()
    const [ perfis, setPerfis ] = useState<Perfil[]>([]) 
    
    const listar = useCallback(async () => {
        const resposta = await httpGet('/perfis')
        setPerfis(resposta ?? [])
    }, [httpGet])
    
    useEffect(() => {
        listar()
    }, [listar])

    return {
        perfis
    }
}