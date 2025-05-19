import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
import usePeriodoInscricao from "./usePeriodoInscricao";
import useUsuarios from "./useUsuario";
import useClube from "./useClube";
import useCurso from "./useCurso";
import { useEffect } from "react";
import useAPI from "./useAPI";

export const relaotorioSchema = z.object({
    clube: z.string().optional(),
    curso: z.string().optional(),
    periodoInscricao: z.string().optional(),
    usuario: z.string().optional(),
    statusPagamento: z.string().optional(),
    numero: z.string().optional(),
});

export default function useRelatorio() {
    const { httpPost } = useAPI()
    const { periodoInscricoes } = usePeriodoInscricao()
    const { usuarios, recuperarUsuariosDoCurso } = useUsuarios()
    const { clubes } = useClube()
    const { cursos } = useCurso()

    const form = useForm<z.infer<typeof relaotorioSchema>>({
        resolver: zodResolver(relaotorioSchema),
        
        defaultValues: {
            clube: "",
            curso: "",
            periodoInscricao: "",
            usuario: "",
            statusPagamento: "",
            numero: ""
        }
    })

    const gerarRelatorio = async (data: z.infer<typeof relaotorioSchema>) => {
        try {
            const resposta = await httpPost("/pedidos/relatorio", data);
            
            if (resposta instanceof Blob) {
                const url = window.URL.createObjectURL(resposta);
                const a = document.createElement("a");
                a.href = url;
                a.download = "relatorio_pedidos.xlsx";
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                console.error("Erro: Esperado um arquivo binário, mas recebeu:", resposta);
            }
        } catch (error) {
            console.error("Erro ao gerar relatório:", error);
            throw new Error("Erro ao gerar relatório");
        }
    };

    useEffect(() => {
        const cursoSelecionado = form.watch("curso");
        if (cursoSelecionado) recuperarUsuariosDoCurso(Number(cursoSelecionado));
    }, [form.watch("curso")]);
    
    return { 
        form, gerarRelatorio, clubes, cursos, 
        periodoInscricoes, usuarios, 
        recuperarUsuariosDoCurso 
    }
}