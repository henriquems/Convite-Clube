'use client'
import Card from "@/components/shared/Card";
import TituloPagina from "@/components/shared/TituloPagina";
import { IconFileText, IconMessage2Down } from "@tabler/icons-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useRetorno from "@/data/hooks/useRetorno";

export default function Retorno() {
    const { retornos, page, pageSize, total, setFile, handleUpload, progresso, gerarRelatorio } = useRetorno();
    
    return (
        <div>
            <TituloPagina 
                icone={<IconMessage2Down width={20} height={20} />} 
                descricao="Retorno Bancário"
                entidade="arquivos"
                quantidadeRegistros={total}
            />

            <Card titulo="Selecione o arquivo"
                icon={<IconFileText width={18} height={18} />}
            >
                <div className="flex items-center gap-2">
                    <input
                        type="file"
                        accept=".ret,.txt"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className=" text-sm text-orange-400 cursor-pointer
                            bg-zinc-50 border border-zinc-300
                            rounded-md px-2 py-1.5
                            file:mr-1 file:py-2 file:px-2
                            file:rounded file:border-0 file:cursor-pointer
                            file:text-xs file:text-zinc-100 file:font-light
                            file:bg-green-600 file:hover:bg-green-700"
                    />
                    <button onClick={handleUpload} className="botao primario">Enviar</button>
                </div>
            </Card>

            {progresso > 0 && <progress value={progresso} max="100">{progresso}%</progress>}

            <DataTable
                columns={columns(gerarRelatorio)}
                data={retornos} 
                page={page} 
                pageSize={pageSize} 
                totalCount={total} 
            />
        </div>
    )
}