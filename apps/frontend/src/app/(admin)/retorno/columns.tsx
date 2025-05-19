"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { formatDateTimeBR, Retorno } from "@conviteclube/core"
import { IconFileAnalytics } from "@tabler/icons-react"
 
type ColunasProps = (gerarRelatorio: (arquivo: string, dataProcessamento: Date) => void) => ColumnDef<Retorno>[]
 
export const columns: ColunasProps = (gerarRelatorio) => [
  {
    accessorKey: "arquivo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Arquivo</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "agencia",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Agência</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "conta",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Conta</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "dataProcessamento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Data</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <span>{ formatDateTimeBR(row.original.dataProcessamento) }</span>
      );
    },
  },
  {
    id: "relatorio",
    header: () => {
      return (<span className="text-zinc-500 font-semibold">Relatório</span>)
    },
    cell: ({ row }) => (
      <div>
        <IconFileAnalytics
        width={30}
        height={30}
        stroke={2}
        onClick={() => gerarRelatorio(row.original.arquivo ?? "", row.original.dataProcessamento)}
        className="text-green-700 hover:text-green-600 cursor-pointer"
      />
      </div>
    ),
  }
 
]