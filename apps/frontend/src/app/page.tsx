'use client'
import Card from "@/components/shared/Card";
import Logo from "@/components/shared/Logo";
import RodapeExterno from "@/components/template/RodapeExterno";
import FormLogin from "@/components/auth/FormLogin";
import { IconKey } from "@tabler/icons-react";

export default function Home() {
    
    return (
        <div className="flex flex-col items-center 
            justify-center w-screen h-screen gap-1">  
            <Logo altura={40} largura={40} className="text-green-700 text-lg" />
            
            <div className="w-[90%] lg:w-[35%]">
                <Card titulo="Informe seus dados de acesso" 
                    icon={<IconKey width={18} height={18} />}
                    tamanho="grande"
                >
                    <FormLogin />
                </Card>
            </div>

            <RodapeExterno />
        </div>
    );
}
