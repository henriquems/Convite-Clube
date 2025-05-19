import Image from 'next/image'

export default function Processando() {
    return (
        <div className="h-screen">
            <div className="flex flex-col justify-center items-center
                absolute top-0 left-0 w-full h-full gap-6 text-center"
            >
                <Image src="/loading.gif" alt="Carregando" width={100} height={100} unoptimized />
                <span className="font-semibold text-zinc-400 ml-3">Processando...</span>
            </div>
        </div>
    )
}