'use client'
import TituloPagina from "@/components/shared/TituloPagina";
import useUsuario from "@/data/hooks/useUsuario";
import Card from "@/components/shared/Card";
import Link from "next/link";
import { StatusUsuario } from "@conviteclube/core"
import { IconChevronLeft, IconDeviceFloppy, IconFileText, IconUsers } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"

export default function CadastroUsuario() {
    const { salvar, form, perfis } = useUsuario()
    
    return (
        <div>
            <TituloPagina 
                descricao="Cadastro de Usuários" 
                icone={<IconUsers width={20} height={20} />} 
            />

            <Card titulo="Dados do Usuário"
                icon={<IconFileText width={18} height={18} />}
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(salvar)}>
                        <div className="w-full lg:w-[60%] mt-2">
                            <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full gap-2">
                                <div className="flex flex-col gap-1">
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione aqui..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                    {Object.values(StatusUsuario).map((status) => (
                                                        <SelectItem key={status} value={status}>
                                                        {status}
                                                        </SelectItem>
                                                    ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-1">
                                    <FormField
                                        control={form.control}
                                        name="perfis"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Perfis</FormLabel>
                                            { perfis.length === 0 ? (
                                                <p className="text-xs text-muted-foreground">Carregando perfis...</p>
                                            ) : (
                                                <div className="flex items-center gap-2 h-11 p-2 
                                                    border border-zinc-300 rounded-md bg-zinc-50 shadow-sm">
                                                    {perfis.map((perfil) => {
                                                    const isChecked = field.value?.some(p => p.id === perfil.id)
                                                    return (
                                                        <div key={perfil.id} className="flex items-center space-x-1">
                                                        <Checkbox
                                                            id={`perfil-${perfil.id}`}
                                                            checked={isChecked}
                                                            onCheckedChange={(checked) => {
                                                            const atual = field.value ?? []
                                                            const newValue = checked
                                                                ? [...atual, perfil]
                                                                : atual.filter((p) => p.id !== perfil.id)
                                                            field.onChange(newValue)
                                                            }}
                                                        />
                                                        <Label htmlFor={`perfil-${perfil.id}`} 
                                                            className="cursor-pointer pr-4 text-zinc-500 text-[11px]">
                                                            {perfil.nome}
                                                        </Label>
                                                        </div>
                                                    )
                                                    })}
                                                </div>
                                            )}
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-1">
                                    <FormField 
                                        control={form.control}
                                        name="nome"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome</FormLabel>
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
                                        name="cpf"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CPF</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} 
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
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

                                <div className="flex flex-col gap-1">
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

                                <div className="flex flex-col gap-1">
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
                                
                                <div className="flex flex-col gap-1">
                                    <FormField 
                                        control={form.control}
                                        name="repitaSenha"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Repita Senha</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} 
                                    />
                                </div>

                                <div className="flex items-center gap-2 mt-8">
                                    <button type="submit" className="botao primario">
                                        <IconDeviceFloppy width={18} height={18} />
                                        <span>Salvar</span>
                                    </button>
                                    <Link href="/usuario" className="botao secundario">
                                        <IconChevronLeft width={18} height={18} />
                                        <span>Voltar</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    )
}