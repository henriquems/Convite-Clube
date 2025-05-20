"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { IconClipboardText, IconFileBarcode } from "@tabler/icons-react"
import { formatCurrencyBRL, formatDateTimeBR, Pedido } from "@conviteclube/core"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
 
type ColunasProps = (handleEmitirBoleto: (pedido: Pedido) => void) => ColumnDef<Pedido>[]
 
export const columns: ColunasProps = (handleEmitirBoleto) => [
  {
    accessorKey: "numero",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Número</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },cell: ({ row }) => {
      return (
        <span className="font-semibold">{ row.original.numero }</span>
      );
    },
  },
  {
    accessorFn: row => row.periodoInscricao.clube?.descricao,
    id: "periodoInscricao.clube.descricao",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Clube</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "usuario.nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Usuário</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "periodoInscricao.descricao",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Périodo</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Status</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <span className={`${row.original.statusPagamento === 'PAGO' ? 'text-blue-600' : 'text-red-600'}`}>
          { row.original.statusPagamento }
        </span>
      );
    },
  },
  {
    accessorKey: "valorPedido",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Valor</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },cell: ({ row }) => {
      return (
        <span>{ formatCurrencyBRL(row.original.valorPedido) }</span>
      );
    },
  },
  {
    accessorKey: "dataPedido",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Vencimento</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },cell: ({ row }) => {
      return (
        <span>{ formatDateTimeBR(row.original.dataPedido) }</span>
      );
    },
  },
  {
    id: "detalhes",
    header: () => {
      return (<span className="text-zinc-500 font-semibold">Detalhes</span>)
    },
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <IconClipboardText width={30} height={30} stroke={2} 
              className="text-green-700 hover:text-green-600 cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="max-w-[95%] lg:max-w-[700px] bg-zinc-100">
            <DialogHeader>
              <DialogTitle className="text-green-700 font-normal">Detalhes do Pedido</DialogTitle>
            </DialogHeader>
            <div className="bg-zinc-200 rounded-lg p-4 mt-3 mb-2">
              <div className="grid text-sm text-zinc-500 grid-cols-2 items-center gap-2">
                  <div>
                    <label>Número: </label>
                    <span>{ row.original.numero }</span>
                  </div>
                  <div>
                    <label>Clube: </label>
                    <span>{ row.original.periodoInscricao.clube.descricao }</span>
                  </div>
                  <div>
                    <label>Usuário: </label>
                    <span>{ row.original.usuario.nome }</span>
                  </div>
                  <div>
                    <label>RA: </label>
                    <span>{ row.original.usuario.login }</span>
                  </div>
                  <div>
                    <label>Descrição: </label>
                    <span>{ row.original.periodoInscricao.descricao }</span>
                  </div>
                  <div>
                    <label>Status: </label>
                    <span className={`${row.original.statusPagamento === 'PAGO' ? 'text-blue-600' : 'text-red-600'}`}>
                        { row.original.statusPagamento }
                    </span>
                  </div>
                  <div>
                    <label>Valor Pedido: </label>
                    <span>{ formatCurrencyBRL(row.original.valorPedido) }</span>
                  </div>
                  <div>
                    <label>Valor Pago: </label>
                    <span>{ formatCurrencyBRL(row.original.valorPago ?? 0) }</span>
                  </div>
                  <div>
                    <label>Data Início: </label>
                    <span>{ formatDateTimeBR(row.original.periodoInscricao.dataInicio) }</span>
                  </div>
                  <div>
                    <label>Data Fim: </label>
                    <span>{ formatDateTimeBR(row.original.periodoInscricao.dataFim) }</span>
                  </div>
                  <div>
                    <label>Vencimento: </label>
                    <span>{ formatDateTimeBR(row.original.periodoInscricao.dataLimitePagamento) }</span>
                  </div>
                  <div>
                    <label>Data Pagamento: </label>
                    <span>{ row.original.dataPagamento !== null ? formatDateTimeBR(row.original.dataPagamento) : 'AGUARDANDO' }</span>
                  </div>
                  <div>
                    <label>Data Pedido: </label>
                    <span>{ formatDateTimeBR(row.original.dataPedido) }</span>
                  </div>
              </div>
            </div>
            <DialogFooter>
                <div className="flex gap-1">
                  <DialogClose asChild>
                    <Button type="button" className="botao primario">
                      Fechar
                    </Button>
                  </DialogClose>
                </div>
              </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    id: "boleto",
    header: () => {
      return (<span className="text-zinc-500 font-semibold">Boleto</span>)
    },
    cell: ({ row }) => (
      <IconFileBarcode
        width={30}
        height={30}
        stroke={2}
        onClick={() => handleEmitirBoleto(row.original)}
        className="text-green-700 hover:text-green-600 cursor-pointer"
      />
    ),
  }
]