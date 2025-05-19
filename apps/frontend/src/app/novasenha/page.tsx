'use client'
import Card from "@/components/shared/Card";
import Logo from "@/components/shared/Logo";
import RodapeExterno from "@/components/template/RodapeExterno";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useNovaSenha from "@/data/hooks/useNovaSenha";
import { IconMail } from "@tabler/icons-react";

export default function NovaSenha() {
    const { gerarNovaSenha, form } = useNovaSenha();
    
    return (
        <div className="flex flex-col items-center justify-center
            w-screen h-screen gap-1
        ">
            <Logo altura={40} largura={40} className="text-green-700" />
            
            <div className="w-[90%] lg:w-[35%]">
                <Card titulo="Informe seu e-mail de cadastro"
                    icon={<IconMail width={18} height={18} />}
                    descricaoLink="Voltar" 
                    tamanho="grande"
                    caminhoLink="/"
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(gerarNovaSenha)}>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <FormField 
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>E-mail</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} 
                                    />    
                                </div>   
                                
                                <div className="mt-2">
                                    <button className="botao primario w-full">Gerar nova senha</button>    
                                </div>
                            </div> 
                        </form>
                    </Form>
                </Card>
            </div>
            
            <RodapeExterno />
        </div>
    );
}
