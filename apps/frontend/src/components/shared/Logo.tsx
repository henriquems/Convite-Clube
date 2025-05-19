import { IconCreditCard } from "@tabler/icons-react";
import { Righteous } from 'next/font/google'
import Link from "next/link";

const fonte = Righteous({
    subsets: ["latin"],
    weight: "400"
})

export interface LogoProps {
    largura: number
    altura: number
    className: string
}

export default function Logo(props: LogoProps) {
    return (
        <Link href="/" className={`flex items-center gap-1 ${fonte.className}`}>
            <IconCreditCard 
                width={props.largura} 
                height={props.altura} 
                stroke={2} 
                className={props.className} 
            />
            <h1 className={`font-light 
                ${props.className}
            `}>CONVITE CLUBE</h1>
        </Link>
    )
}