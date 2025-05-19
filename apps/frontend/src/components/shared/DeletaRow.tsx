import { IconTrash } from "@tabler/icons-react"
import { Row } from "@tanstack/react-table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, 
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export interface DeletaRowProps {
    row: Row<any>
    excluir: (id: number) => void
}

export default function DeletaRow(props: DeletaRowProps) {
    const { excluir, row } = props

    return (
        <AlertDialog>
          <AlertDialogTrigger>
            <IconTrash width={30} height={30} stroke={2} className="text-green-700 hover:text-green-600" />
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-zinc-100 w-[400px]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-green-700">Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription className="h-10 mt-10">
                Tem certeza que deseja excluir o registro?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => excluir(row.original.id ?? 0)} className="botao primario">
                Excluir 
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    )
}