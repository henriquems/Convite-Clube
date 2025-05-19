'use client'
import TituloPagina from "@/components/shared/TituloPagina";
import usePeriodoInscricao from "@/data/hooks/usePeriodoInscricao";
import { IconCreditCardPay } from "@tabler/icons-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function SolicitarConvite() {
    const { periodoInscricoes, page, pageSize, total, clubes, reservar } = usePeriodoInscricao();

    return (
        <div>
            <TituloPagina 
                icone={<IconCreditCardPay width={20} height={20} />} 
                descricao="Solicitar Convite"
                entidade="perídos de inscrições"
                quantidadeRegistros={total}
            />
            
            <DataTable 
                columns={columns(reservar)} 
                data={periodoInscricoes} 
                page={page} 
                pageSize={pageSize} 
                totalCount={total} 
                clubes={clubes}
            />
        </div>
    )
}