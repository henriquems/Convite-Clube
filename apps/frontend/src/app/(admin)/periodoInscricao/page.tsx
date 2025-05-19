'use client'
import TituloPagina from "@/components/shared/TituloPagina";
import usePeriodoInscricao from "@/data/hooks/usePeriodoInscricao";
import { IconCalendarWeek } from "@tabler/icons-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useClube from "@/data/hooks/useClube";

export default function PeriodoInscricao() {
    const { periodoInscricoes, page, pageSize, total, excluir } = usePeriodoInscricao();
    const { clubes } = useClube();

    return (
        <div>
            <TituloPagina 
                icone={<IconCalendarWeek width={20} height={20} />} 
                descricao="Pesquisa de Períodos"
                entidade="perídos"
                quantidadeRegistros={total}
                labelBotao="Novo Período"
                urlBotao="/periodoInscricao/cadastro"
            />

            <DataTable 
                columns={columns(excluir)} 
                data={periodoInscricoes} 
                page={page} 
                pageSize={pageSize} 
                totalCount={total} 
                clubes={clubes}
            />
        </div>
    )
}