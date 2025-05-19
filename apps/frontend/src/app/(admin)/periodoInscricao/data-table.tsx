"use client"
import {
  ColumnDef,
  SortingState,
  flexRender,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"
import { Input } from "@/components/ui/input"
import { PaginationWithLinks } from "@/components/ui/pagination-with-links"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clube } from "@conviteclube/core"
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number
  pageSize: number
  totalCount: number
  clubes: Clube[]
}

export function DataTable<TData, TValue>({columns, data, page, pageSize, totalCount, clubes}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), 
    onSortingChange: setSorting, 
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div className="flex items-center gap-4 mb-3">
        <Select
          onValueChange={(value) =>
            table.getColumn("clube.descricao")?.setFilterValue(value === "TODOS" ? undefined : value)
          }
          value={(table.getColumn("clube.descricao")?.getFilterValue() as string) ?? "TODOS"}
        >
          <SelectTrigger className="max-w border-zinc-300">
            <SelectValue placeholder="Filtrar por clube" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODOS">Todos os clubes</SelectItem>
            {clubes.map((clube) => (
              <SelectItem key={clube.id} value={clube.descricao}>
                {clube.descricao}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Filtrar por descrição"
          value={(table.getColumn("descricao")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("descricao")?.setFilterValue(event.target.value)
          }
          className="max-w input"
        />
        <Input
          placeholder="Filtrar por data início"
          value={(table.getColumn("dataInicio")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("dataInicio")?.setFilterValue(event.target.value)
          }
          className="max-w input"
        />
        <Input
          placeholder="Filtrar por data fim"
          value={(table.getColumn("dataFim")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("dataFim")?.setFilterValue(event.target.value)
          }
          className="max-w input"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-zinc-700">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-zinc-600">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum período de inscrição cadastrado no sistema
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end mt-3">
        <PaginationWithLinks page={page} pageSize={pageSize} totalCount={totalCount} />
      </div>
    </div>
  )
}