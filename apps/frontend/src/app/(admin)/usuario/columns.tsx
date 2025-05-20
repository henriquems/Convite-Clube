"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { IconEdit, IconSchool, IconUserCog, IconUserDollar } from "@tabler/icons-react"
import { Usuario } from "@conviteclube/core"
import Link from "next/link";
import Status from "@/components/shared/Status"
import DeletaRow from "../../../components/shared/DeletaRow"
 
type ColunasProps = (excluir: (id: number) => void) => ColumnDef<Usuario>[]
 
export const columns: ColunasProps = (excluir) => [
  {
    accessorKey: "perfil",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Perfil</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-xs flex justify-center gap-2">
          {row.original.perfis?.map((p) => {
            if (p.nome === 'ADMINISTRADOR')
              return (
                <div key={p.nome} className="flex flex-col justify-end items-center">
                  <IconUserCog width={26} height={26} stroke={2} className="text-green-700 hover:text-green-600" />
                  <span className="text-[9px] text-green-700">{p.nome}</span>
                </div>
              )
            else if (p.nome === 'ALUNO')
              return (
                <div key={p.nome} className="flex flex-col justify-end items-center">
                  <IconSchool width={26} height={26} stroke={2} className="text-green-700 hover:text-green-600" />
                  <span className="text-[9px] text-green-700">{p.nome}</span>
                </div>
              )
            else if (p.nome === 'FINANCEIRO')
              return (
                <div key={p.nome} className="flex flex-col justify-end items-center">
                  <IconUserDollar width={26} height={26} stroke={2} className="text-green-700 hover:text-green-600" />
                  <span className="text-[9px] text-green-700">{p.nome}</span>
                </div>
              )
          })}
        </div>
      )
    },
    filterFn: (row, columnId, filterValue) => {
      const perfis = row.original.perfis?.map(p => p.nome) ?? []
      return perfis.includes(filterValue)
    },
    sortingFn: (rowA, rowB, columnId) => {
      const perfisA = rowA.original.perfis?.map(p => p.nome).sort().join(", ") ?? ""
      const perfisB = rowB.original.perfis?.map(p => p.nome).sort().join(", ") ?? ""
      return perfisA.localeCompare(perfisB)
    }
  },
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Nome</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">E-mail</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "login",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-zinc-500 font-semibold">Login</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "cpf",
    header: () => {
      return (<span className="text-zinc-500 font-semibold">CPF</span>)
    }
  },
  {
    accessorKey: "status",
    header: () => {
      return (<span className="text-zinc-500 font-semibold">Status</span>)
    },
    cell: ({ row }) => {
      return (
          <Status valor={row.original.status} />
      )
    },
  },
  {
    id: "editar",
    header: () => {
      return (<span className="text-zinc-500 font-semibold">Editar</span>)
    },
    cell: ({ row }) => {
      return (
        <Link href={`/usuario/cadastro/${row.original.id}`} >
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