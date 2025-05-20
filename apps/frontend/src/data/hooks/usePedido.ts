import { useSearchParams } from "next/navigation"
import useAPI from "./useAPI";
import { Pedido} from "@conviteclube/core";
import { useCallback, useEffect, useState } from "react";

export default function usePedido() {
    const { httpGet } = useAPI()
    const [ pedido ] = useState<Pedido>()
    const [ pedidos, setPedidos ] = useState<Pedido[]>([])
    const [ total, setTotal ] = useState(0);

    const searchParams = useSearchParams();
    const page: number = parseInt(searchParams.get('page') || "1")
    const pageSize: number = parseInt(searchParams.get('pageSize') || "10")
    
    const listar = useCallback(async function () {
        const resposta = await httpGet(`/pedidos?page=${page}&pageSize=${pageSize}`);
        setPedidos(resposta.pedidos ?? []);
        setTotal(resposta.total);
    }, [httpGet, page, pageSize]);
    
    useEffect(() => {
        listar();
    }, [listar]);

    return {
        listar, pedido, pedidos, page, pageSize, total
    }
}