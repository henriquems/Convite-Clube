import { useCallback, useEffect, useState } from "react";
import { Curso } from "@conviteclube/core";
import useAPI from "./useAPI";

export default function useClube() {
    const { httpGet } = useAPI()
    const [ cursos, setCursos ] = useState<Curso[]>([]) 
    
    const listar = useCallback(async () => {
        const resposta = await httpGet('/cursos')
        setCursos(resposta ?? [])
    }, [httpGet])
    
    useEffect(() => {
        listar()
    }, [listar])

    return { cursos }
}