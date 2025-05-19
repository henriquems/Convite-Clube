'use client'
import TituloPagina from "@/components/shared/TituloPagina";
import { IconCalendarWeek } from "@tabler/icons-react";
import { DataTable } from "./data-table";
import usePedido from "@/data/hooks/usePedido";
import useClube from "@/data/hooks/useClube";
import { columns } from "./columns";
import useBoleto from "@/data/hooks/useBoleto";
import { useState } from "react";
import { Boleto, formatCurrencyBRL, formatDateTimeBR, Pedido } from "@conviteclube/core";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

export default function PesquisaPedido() {
    const { pedidos, total, page, pageSize } = usePedido();
    const { verificarEmissao, abrirBoleto } = useBoleto();
    const { clubes } = useClube();
    const [ boleto, setBoleto ] = useState<Boleto | null>(null);

    const handleEmitirBoleto = (pedido: Pedido) => {
        verificarEmissao(pedido, setBoleto);
    };

    const fecharDialog = () => setBoleto(null);

    return (
        <div>
            <TituloPagina 
                icone={<IconCalendarWeek width={20} height={20} />} 
                descricao="Pesquisa de Pedidos"
                entidade="pedidos"
                quantidadeRegistros={total}
            />

            <DataTable
                columns={columns(handleEmitirBoleto)}
                data={pedidos} 
                page={page} 
                pageSize={pageSize} 
                totalCount={total} 
                clubes={clubes}
            />

            { boleto && (
                <Dialog open={true} onOpenChange={fecharDialog}>
                    <DialogContent className="max-w-[95%] lg:max-w-[550px] bg-zinc-100">
                        <DialogHeader>
                            <DialogTitle className="text-green-700 font-normal">Boleto Emitido</DialogTitle>
                        </DialogHeader>
                        <div className="bg-zinc-200 rounded-lg p-4 mt-2 mb-2">
                            <div className="grid text-sm text-zinc-500 grid-cols-2 items-center gap-2">
                                <div><label>Pedido: </label><span>{boleto.pedido.numero}</span></div>
                                <div><label>Clube: </label><span>{boleto.pedido.periodoInscricao.clube.descricao}</span></div>
                                <div><label>Valor: </label><span>{formatCurrencyBRL(boleto.valor / 100)}</span></div>
                                <div><label>Data Pedido: </label><span>{formatDateTimeBR(boleto.pedido.dataPedido)}</span></div>
                                <div><label>Data Boleto: </label><span>{formatDateTimeBR(boleto.dataBoleto)}</span></div>
                                <div><label>Data Vencimento: </label><span>{formatDateTimeBR(boleto.dataVencimento)}</span></div>
                                <div><label>Pagamento: </label><span>{boleto?.statusBoleto ?? '---'}</span></div>
                                <div><label>Enviado: </label><span>{boleto?.statusEnvio ?? '---'}</span></div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <div className="flex gap-2">
                                    <Button type="button" onClick={() => abrirBoleto(boleto ?? 0)} 
                                        className="botao primario">
                                        Imprimir Boleto
                                    </Button>
                                    <Button type="button" className="botao secundario">
                                        Fechar
                                    </Button>
                                </div>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}