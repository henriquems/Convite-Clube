"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { formatCurrencyBRL, PeriodoInscricao, formatDateTimeBR } from "@conviteclube/core"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"

type ColunasProps = (reservar: (id: number) => void) => ColumnDef<PeriodoInscricao>[]
 
export const columns: ColunasProps = (reservar) => [
  {
    accessorKey: "Selecione",
    header: () => {
      return (
        <span className="flex justify-center items-center 
          text-zinc-500 font-semibold">
          Selecione
        </span>
      )
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex justify-center items-center">
          <Dialog>
            <DialogTrigger asChild>
              { row.original.clube.descricao === 'Clube Cruzeiro' ? (
                <Image src="/cruzeiro.png" className="cursor-pointer" 
                  title={row.original.clube.descricao} 
                  width={50} height={50} alt="icone-cruzeiro"
                />
              ) : (
                <Image src="/atletico.png" className="cursor-pointer"
                  title={row.original.clube.descricao}
                  width={50} height={50} alt="icone-atletico"
                />
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-zinc-100">
              <DialogHeader>
                <DialogTitle className="text-green-700">Confirmar pedido de convite</DialogTitle>
                <DialogDescription>
                    <span className="text-xs text-orange-400">O convite será confirmado somente após o pagamento!</span>
                </DialogDescription>
              </DialogHeader>
                <div className="flex items-center gap-4 mb-2
                  bg-zinc-200 rounded-lg p-4">
                  <div>
                    { row.original.clube.descricao === 'CLUBE CRUZEIRO' ? (
                      <Image src="/cruzeiro.png" alt={row.original.clube.descricao} 
                        width={100} height={100}
                      />
                    ) : (
                      <Image src="/atletico.png" alt={row.original.clube.descricao}
                        width={100} height={100}
                      />
                    )}
                  </div>
                  <div className="flex flex-col text-sm text-zinc-500 gap-1">
                    <div className="flex gap-1">
                      <span>Clube:</span>
                      <span>{ data.clube.descricao }</span>  
                    </div>
                    <div className="flex gap-1">
                      <span>Valor:</span>
                      <span>{ formatCurrencyBRL(data.valorConvite) }</span>  
                    </div>
                    <div className="flex gap-1">
                      <span>Data Início:</span>
                      <span>{ formatDateTimeBR(data.dataInicio) }</span>  
                    </div>
                    <div className="flex gap-1">
                      <span>Data Fim:</span>
                      <span>{ formatDateTimeBR(data.dataFim) }</span>
                    </div>
                    <div className="flex gap-1">
                      <span>Vencimento:</span>
                      <span>{ formatDateTimeBR(data.dataLimitePagamento) }</span>
                    </div>
                  </div>
                </div>
              <DialogFooter>
                <div className="flex gap-1">
                  <DialogClose asChild>
                    <Button type="button" className="botao secundario">
                      Cancelar
                    </Button>
                  </DialogClose>

                  <Button onClick={() => reservar(data.id!)}
                    type="button" className="botao primario">
                    Confirmar
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>         
        </div>
      );
    },
  },
  {
    accessorFn: row => row.clube?.descricao,
    id: "clube.descricao",
    header: () => {
      return (
        <span className="text-zinc-500 font-semibold">Clube</span>
      )
    },
  },
  {
    accessorKey: "descricao",
    header: () => {
      return <span className="text-zinc-500 font-semibold">Descrição</span>
    },
  },
  {
    accessorKey: "dataInicio",
    header: () => {
      return <span className="text-zinc-500 font-semibold">Data Início</span>
    },
    cell: ({ row }) => {
      return (
        <span>{ formatDateTimeBR(row.original.dataInicio) }</span>
      );
    },
  },
  {
    accessorKey: "dataFim",
    header: () => {
      return <span className="text-zinc-500 font-semibold">Data Fim</span>
    },
    cell: ({ row }) => {
      return (
        <span>{ formatDateTimeBR(row.original.dataFim) }</span>
      );
    },
  },
  {
    accessorKey: "dataLimitePagamento",
    header: () => {
      return <span className="text-zinc-500 font-semibold">Vencimento</span>
    }, 
    cell: ({ row }) => {
      return (
        <span>{ formatDateTimeBR(row.original.dataLimitePagamento) }</span>
      );
    },
  },
  {
    accessorKey: "quantidadeConvite",
    header: () => {
      return (<span className="text-zinc-500 font-semibold">Convites</span>)
    }, 
    cell: ({ row }) => {
      return (
        <span className="text-green-700 text-sm">Restam { row.original.quantidadeConvitesRestantes } de { row.original.quantidadeConvite }</span>
      );
    },
  },
  {
    accessorKey: "valorConvite",
    header: () => {
      return (<span className="text-zinc-500 font-semibold">Valor</span>)
    }, 
    cell: ({ row }) => {
      return (
        <span className="text-orange-600">{ formatCurrencyBRL(row.original.valorConvite) }</span>
      );
    },
  },
]