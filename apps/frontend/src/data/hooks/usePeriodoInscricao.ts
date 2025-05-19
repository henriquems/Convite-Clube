import { gerarNumeroAleatorio, PeriodoInscricao, StatusPagamento } from "@conviteclube/core";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useAPI from "./useAPI";
import useClube from "./useClube";
import useSessao from "./useSessao";

const clubeSchema = z.object({
    id: z.number().optional(),
    descricao: z.string().min(1, "Favor informar o campo clube!")
})

const periodoInscricaoSchema = z.object({
    id: z.number().optional(),
    clube: clubeSchema,
    descricao: z.string().min(1, { message: "Favor informar o campo descrição!" }),
    dataInicio: z.coerce.date({ required_error: "Favor informar o campo data início!" }),
    dataFim: z.coerce.date({ required_error: "Favor informar o campo data fim!" }),
    quantidadeConvite: z.coerce.number({ invalid_type_error: "Favor informar o campo quantidade convites!" }),
    valorConvite: z.coerce.number({ invalid_type_error: "Favor informar o campo valor convite!" }),
    dataLimitePagamento: z.coerce.date({ required_error: "Favor informar o campo data limite pagamento!" }),
});

export default function usePeriodoInscricao() {
    const router = useRouter()
    const pathname = usePathname();
    const params = useParams()
    const [ mensagem, setMensagem ] = useState("");
    const [ periodoInscricoes, setPeriodoIncricoes ] = useState<PeriodoInscricao[]>([])
    const [ total, setTotal ] = useState(0);
    
    const { httpGet, httpPost, httpDelete } = useAPI()
    const { clubes } = useClube();
    const { usuario } = useSessao();

    const searchParams = useSearchParams()
    const page: number = parseInt(searchParams.get('page') || "1")
    const pageSize: number = parseInt(searchParams.get('pageSize') || "10")

    const form = useForm<z.infer<typeof periodoInscricaoSchema>>({
        resolver: zodResolver(periodoInscricaoSchema),
        defaultValues: {
            clube: undefined,
            descricao: "",
            dataInicio: undefined,
            dataFim: undefined,
            quantidadeConvite: 0,
            valorConvite: 0,
            dataLimitePagamento: undefined
        }
    })
    
    const listar = useCallback(async function () {
        const resposta = await httpGet(`/periodosInscricoes?page=${page}&pageSize=${pageSize}`);
        setPeriodoIncricoes(resposta.periodoInscricoes ?? []);
        setTotal(resposta.total);
    }, [httpGet, page, pageSize]);

    const listarPeriodosProUsuario = useCallback(async function () {
        const resposta = await httpGet(`/periodosInscricoes/convite?page=${page}&pageSize=${pageSize}&usuario=${usuario}`);
        setPeriodoIncricoes(resposta.periodoInscricoes);
        setTotal(resposta.total);
    }, [httpGet, page, pageSize]);

    const salvar = async () => {
        await httpPost('/periodosInscricoes/cadastro', {
            id: form.getValues("id"),
            clube: form.getValues("clube"), 
            descricao: form.getValues("descricao"), 
            dataInicio: form.getValues("dataInicio"), 
            dataFim: form.getValues("dataFim"), 
            quantidadeConvite: form.getValues("quantidadeConvite"), 
            valorConvite: form.getValues("valorConvite"), 
            dataLimitePagamento: form.getValues("dataLimitePagamento")
        })
        toast.success("Período Inscrição salvo com sucesso!")
        router.push("/periodoInscricao")
    }

    const excluir = async (id: number) => {
        await httpDelete(`/periodosInscricoes/${id}`)
        setPeriodoIncricoes(periodoInscricoes.filter((periodoInscricao) => periodoInscricao.id !== id))
        setTotal(total - 1);
        toast.success("Período Inscrição excluído com sucesso!")
    }

    const recuperar = async (id: number) => {
        const periodoInscricao = await httpGet(`/periodosInscricoes/${id}`)
       
        if (periodoInscricao) {
            form.reset({
                id: periodoInscricao.id,
                clube: {
                  id: periodoInscricao.clube?.id ?? undefined,
                  descricao: periodoInscricao.clube?.descricao ?? "",
                },
                descricao: periodoInscricao.descricao ?? "",
                dataInicio: periodoInscricao.dataInicio ? new Date(periodoInscricao.dataInicio) : new Date(),
                dataFim: periodoInscricao.dataFim ? new Date(periodoInscricao.dataFim) : new Date(),
                quantidadeConvite: Number(periodoInscricao.quantidadeConvite ?? 0),
                valorConvite: Number(periodoInscricao.valorConvite ?? 0),
                dataLimitePagamento: periodoInscricao.dataLimitePagamento ? new Date(periodoInscricao.dataLimitePagamento) : new Date(),
            });
        }
    }

    const reservar = async (id: number) => {
        try {
            const periodoInscricao: PeriodoInscricao = await httpGet(`/periodosInscricoes/${id}`)
            
            if(!periodoInscricao) throw new Error('Período de inscrição não encontrado!')
            
            const idUsuario = usuario?.id;
            const idPeriodoInscricao = id;
            const numero = gerarNumeroAleatorio();

            if (idUsuario === undefined) throw new Error("Usuário não encontrado!");
        
            const numeroPedido = idUsuario.toString() + idPeriodoInscricao.toString() + numero.toString();

            await httpPost('/pedidos/cadastro', {
                usuario: usuario,
                periodoInscricao: periodoInscricao,
                numero: numeroPedido,
                valorPedido: periodoInscricao.valorConvite,
                statusPagamento: StatusPagamento.AGUARDANDO,
                dataPedido: new Date()
            })
            
            toast.success("Convite solicitado com sucesso!");
            router.push("/pedido");
        } catch(erro: any) {
            const mensagem = erro?.response?.data?.message || erro?.message || "Erro ao solicitar convite.";
            toast.warning(mensagem);
            listarPeriodosProUsuario();
            router.push("/convite");
        }
    }

    useEffect(() => {
        if (!params.id) {
            if (pathname === '/relatorio' || pathname === '/periodoInscricao') { 
                listar();
            } else if (pathname === '/convite') {
                listarPeriodosProUsuario();
            }
        } else if (params.id && clubes.length > 0) {
            recuperar(Number(params.id));
        }
    }, [params.id, clubes, page, pageSize, pathname]);

    return {
        periodoInscricoes, page, pageSize, total, mensagem, form, clubes,
        excluir, salvar, reservar 
    }
}