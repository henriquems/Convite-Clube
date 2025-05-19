export interface StatusProps {
    valor: string
}

export default function Status(props: StatusProps) {
    return (
        <div className={`flex items-center justify-center
            rounded-lg p-1 text-white text-xs w-[65px]
            ${props.valor === 'ATIVO' ? 'bg-green-700' : 'bg-red-600'}
        `}>
            {props.valor}
        </div>
    )
}