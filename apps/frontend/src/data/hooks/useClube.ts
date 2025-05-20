import { useCallback, useEffect, useState } from "react";
import { Clube } from "@conviteclube/core";
import useAPI from "./useAPI";

export default function useClube() {
    const { httpGet } = useAPI()
    const [ clubes, setClubes ] = useState<Clube[]>([]) 
    
    const listar = useCallback(async () => {
        const resposta = await httpGet('/clubes')
        setClubes(resposta ?? [])
    }, [httpGet])
    
    useEffect(() => {
        listar()
    }, [listar])

    return { clubes }
}