import Cabecalho from './Cabecalho'
import RodapeInterno from './RodapeInterno'

export interface PaginaProps {
    children: any
}

export default function Pagina(props: PaginaProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Cabecalho />
            <main className='flex flex-1 flex-col mt-24 mb-14 container'>
                {props.children}
            </main>
            <RodapeInterno />
        </div>
    )
}