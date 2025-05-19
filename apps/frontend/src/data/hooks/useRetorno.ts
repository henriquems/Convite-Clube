import { useCallback, useEffect, useState } from "react";
import useAPI from "./useAPI";
import { Retorno } from "@conviteclube/core";
import { useSearchParams } from "next/navigation";
import { HttpErro } from "../../errors/HttpErro";

export default function useRetorno() {
    const { httpGet, httpPost, httpPostFormDataComProgresso } = useAPI()
    const [ retornos, setRetornos ] = useState<Retorno[]>([])
    const [ total, setTotal ] = useState(0);
    const [file, setFile] = useState<File | null>(null);

    const searchParams = useSearchParams();
    const page: number = parseInt(searchParams.get('page') || "1")
    const pageSize: number = parseInt(searchParams.get('pageSize') || "10")

    const [progresso, setProgresso] = useState(0);

    const handleUpload = async () => {
        if (!file) return;
    
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const data = await httpPostFormDataComProgresso<{ message: string }>(
                "/retornos/cadastro",
                formData,
                (percentual) => setProgresso(percentual)
            );
            
            alert(data.message);
            setProgresso(0);
        } catch (error) {
            if (error instanceof HttpErro) {
                alert(error.dados.message || "Erro ao fazer upload");
            } else {
                alert("Erro inesperado");
            }
            setProgresso(0);
        }
    }

    const gerarRelatorio = async (arquivo: string, dataProcessamento: Date) => {
        try {
            const resultado = await httpPost('/retornos/relatorio', { arquivo, dataProcessamento });

            if (resultado instanceof Blob) {
                const fileURL = URL.createObjectURL(resultado);
                window.open(fileURL, '_blank');
            } else {
                console.error('Resposta inesperada:', resultado);
            }
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
        }
    }
    
    const listar = useCallback(async function () {
        const resposta = await httpGet(`/retornos?page=${page}&pageSize=${pageSize}`);
        console.log(resposta)
        setRetornos(resposta.retornos ?? []);
        setTotal(resposta.total);
    }, [httpGet, page, pageSize]);
        
    useEffect(() => {
        listar();
    }, []);

    return {
        retornos, page, pageSize, total, setFile, handleUpload, progresso, gerarRelatorio
    }

}