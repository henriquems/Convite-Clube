"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { IconEdit } from "@tabler/icons-react"
import { formatCurrencyBRL, PeriodoInscricao, formatDateTimeBR } from "@conviteclube/core"
import Link from "next/link";
import DeletaRow from "../../../components/shared/DeletaRow"

type ColunasProps = (excluir: (id: number) => void) => ColumnDef<PeriodoInscricao>[]
 
export const columns: ColunasProps = (excluir) => [
  {
    accessorFn: row => row.clube?.descricao,
    id: "clube.descricao",
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
    accessorKey: "descricao",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Descrição</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "dataInicio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Data Início</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <span>{ formatDateTimeBR(row.original.dataInicio) }</span>
      );
    },
  },
  {
    accessorKey: "dataFim",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Data Fim</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },cell: ({ row }) => {
      return (
        <span>{ formatDateTimeBR(row.original.dataFim) }</span>
      );
    },
  },
  {
    accessorKey: "dataLimitePagamento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Data Limite Pagamento</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },cell: ({ row }) => {
      return (
        <span>{ formatDateTimeBR(row.original.dataLimitePagamento) }</span>
      );
    },
  },
  {
    accessorKey: "quantidadeConvite",
    header: () => {
      return (<span className="text-zinc-500 font-semibold">Convites</span>)
    }
  },
  {
    accessorKey: "valorConvite",
    header: () => {
      return (<span className="text-zinc-500 font-semibold">Valor</span>)
    },
    cell: ({ row }) => {
      const data = row.original.valorConvite;
      return (
        <span>{ formatCurrencyBRL(data) }</span>
      );
    },
  },
  {
    id: "editar",
    header: () => {
      return (<span className="text-zinc-500 font-semibold">Editar</span>)
    },
    cell: ({ row }) => {
      return (
        <Link href={`/periodoInscricao/cadastro/${row.original.id}`} >
          <IconEdit width={30} height={30} stroke={2} className="text-green-700 hover:text-green-600" />
        </Link>
      )
    },
  },
  {
    id: "excluir",
    header: () => {
      return (<span className="text-zinc-500 font-semibold">Excluir</span>)
    },
    cell: ({ row }) => {
      return <DeletaRow row={row} excluir={excluir} />
    },
  },
]