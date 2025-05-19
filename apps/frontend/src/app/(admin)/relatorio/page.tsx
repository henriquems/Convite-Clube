'use client'
import Card from "@/components/shared/Card";
import TituloPagina from "@/components/shared/TituloPagina";
import useRelatorio from "@/data/hooks/useRelatorio";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusPagamento } from "@conviteclube/core";
import { IconFileAnalytics, IconSearch, IconSettingsDown } from "@tabler/icons-react";

export default function RelatorioPedidos() {
    const { form, clubes, cursos, periodoInscricoes, usuarios, gerarRelatorio } = useRelatorio()
    
    return (
        <div>
            <TituloPagina 
                icone={<IconFileAnalytics width={20} height={20} />} 
                descricao="Relatório de Pedidos"
            />
            
            <Card titulo="Filtros para pesquisa"
                icon={<IconSearch width={18} height={18} />}
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(gerarRelatorio)}>
                        <div className="w-full lg:w-[50%] mt-2">
                            <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full gap-2">
                                <div className="flex flex-col gap-1">
                                    <FormField
                                        control={form.control}
                                        name="clube"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Clubes</FormLabel>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <FormControl className="border-zinc-300">
                                                        <SelectTrigger>
                                                        <SelectValue placeholder="Selecione aqui..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {clubes.map((clube) => (
                                                        <SelectItem key={clube.id} value={clube.id?.toString() ?? ""}>
                                                            {clube.descricao}
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
                                        name="periodoInscricao"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Períodos</FormLabel>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <FormControl className="border-zinc-300">
                                                        <SelectTrigger>
                                                        <SelectValue placeholder="Selecione aqui..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {periodoInscricoes.map((periodoInscricao) => (
                                                        <SelectItem key={periodoInscricao.id} value={periodoInscricao.id?.toString() ?? ""}>
                                                            {periodoInscricao.descricao}
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
                                        name="curso"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cursos</FormLabel>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <FormControl className="border-zinc-300">
                                                        <SelectTrigger>
                                                        <SelectValue placeholder="Selecione aqui..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {cursos.map((curso) => (
                                                        <SelectItem key={curso.id} value={curso.id?.toString() ?? ""}>
                                                            {curso.descricao}
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
                                        name="usuario"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Alunos</FormLabel>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <FormControl className="border-zinc-300">
                                                        <SelectTrigger>
                                                        <SelectValue placeholder="Selecione aqui..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {usuarios.map((usuario) => (
                                                        <SelectItem key={usuario.id} value={usuario.id?.toString() ?? ""}>
                                                            {usuario.nome}
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
                                        name="statusPagamento"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status Pagamento</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione aqui..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                    {Object.values(StatusPagamento).map((status) => (
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
                                        name="numero"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Número Pedido</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} 
                                    />
                                </div>
                                
                                <div className="flex items-center gap-2 mt-8">
                                    <button type="submit" className="botao primario">
                                        <IconSettingsDown width={18} height={18} />
                                        <span>Gerar Relatório</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    )
}