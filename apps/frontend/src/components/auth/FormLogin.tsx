import useLogin from "@/data/hooks/useLogin"
import Link from "next/link";
import { Input } from "../ui/input";
import { IconClipboardText, IconKey, IconLock } from "@tabler/icons-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";

export default function FormLogin() {
    const { logar, form } = useLogin()
    
    return (
        <div className="flex flex-col gap-4">
           <Form {...form}>
                <form onSubmit={form.handleSubmit(logar)}>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <FormField 
                                control={form.control}
                                name="login"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Login</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />
                        </div>   
                        
                        <div className="flex flex-col gap-2">
                            <FormField 
                                control={form.control}
                                name="senha"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />
                        </div>
                        
                        <div className="mt-2">
                            <button type="submit" className="botao primario w-full">Acessar</button>    
                        </div>
                    </div>
                </form>
            </Form>

            <div className="flex justify-between mt-4 mb-2 pl-2 pr-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="flex gap-1 text-sm link cursor-pointer">
                            <IconKey width={20} height={20} stroke={1.5} />
                            <span>1º Acesso</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95%] lg:max-w-[400px] bg-zinc-100">
                    <DialogHeader>
                        <DialogTitle className="text-green-700 font-normal">Informações 1º Acesso</DialogTitle>
                    </DialogHeader>
                    <div className="bg-zinc-200 rounded-lg p-4 mt-2 mb-2">
                         <span className="text-zinc-600">
                            Os alunos deverão usar no primeiro acesso ao sistema, 
                            o seu número de RA (registro acadêmico) 
                            e o seu CPF!
                        </span>
                    </div>
                    <DialogFooter>
                        <div className="flex gap-1">
                            <DialogClose asChild>
                            <Button type="button" className="botao primario">
                                Fechar
                            </Button>
                            </DialogClose>
                        </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                
                <Link href="/novasenha" className="flex justify-center gap-1 link">
                    <IconLock width={20} height={20} stroke={1.5} />
                    <span>Nova Senha</span>
                </Link>

                <Dialog>
                    <DialogTrigger asChild>
                        <div className="flex gap-1 text-sm link cursor-pointer">
                            <IconClipboardText width={20} height={20} stroke={1.5} />
                            <span>Regulamentos</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95%] lg:max-w-[400px] bg-zinc-100">
                    <DialogHeader>
                        <DialogTitle className="text-green-700 font-normal">Regulamentos</DialogTitle>
                    </DialogHeader>
                    <div className="bg-zinc-200 rounded-lg p-4 mt-2 mb-2">
                        <div className="flex justify-center gap-20">
                            <a href="http://localhost:4000/regulamento/cruzeiro"
                                target="_blank" rel="noopener noreferrer"
                                className="block text-sm px-2 py-1 text-zinc-200 hover:text-zinc-100"
                            >
                                <div className="flex flex-col items-center justify-center gap-1">
                                    <Image src="/cruzeiro.png" width={70} height={70} alt="cruzeiro"
                                        className="opacity-80 hover:opacity-100 cursor-pointer" />
                                    <span className="text-sm text-zinc-500">Clube Cruzeiro</span>
                                </div>
                            </a>
                            
                            <a href="http://localhost:4000/regulamento/atletico"
                                target="_blank" rel="noopener noreferrer"
                                className="block text-sm px-2 py-1 text-zinc-200 hover:text-zinc-100"
                            >
                                <div className="flex flex-col items-center justify-center gap-1">
                                    <Image src="/atletico.png" width={70} height={70} alt="atlético"
                                        className="opacity-80 hover:opacity-100 cursor-pointer" />
                                    <span className="text-sm text-zinc-500">Clube Atlético</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex gap-1">
                            <DialogClose asChild>
                                <Button type="button" className="botao primario">
                                    Fechar
                                </Button>
                            </DialogClose>
                        </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div> 
    )
}