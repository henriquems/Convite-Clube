'use client'
import TituloPagina from "@/components/shared/TituloPagina";
import usePeriodoInscricao from "@/data/hooks/usePeriodoInscricao";
import Card from "@/components/shared/Card";
import Link from "next/link";
import { IconCalendarWeek, IconChevronLeft, IconDeviceFloppy, IconFileText } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ptBR } from "date-fns/locale"

export default function CadastroPeriodoInscricao() {
    const { salvar, form, clubes } = usePeriodoInscricao()
    return (
        <div>
            <TituloPagina 
                descricao="Cadastro de Período" 
                icone={<IconCalendarWeek width={20} height={20} />} 
            />

            <Card titulo="Dados do Período de Inscrição"
                icon={<IconFileText width={18} height={18} />}
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(salvar)}>
                        <div className="w-full lg:w-[50%] mt-2">
                            <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full gap-2">
                                <div className="flex flex-col gap-1">
                                    <FormField
                                        control={form.control}
                                        name="clube"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Clubes</FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        const clubeSelecionado = clubes.find(c => c.id === Number(value));
                                                        field.onChange(clubeSelecionado);
                                                    }}
                                                    value={field.value?.id ? field.value.id.toString() : ""}
                                                    >
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
                                        name="descricao"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Descrição</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} 
                                    />
                                </div>

                                <div className="flex flex-col gap-1 mt-1">
                                    <FormField
                                        control={form.control}
                                        name="dataInicio"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-1">
                                                <FormLabel>Data Início</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={"outline"}
                                                                className={cn("h-11 bg-zinc-50 border-zinc-300 pl-3 text-left", 
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                                >
                                                                {field.value ? (format(field.value, "PPP", { locale: ptBR })) : (
                                                                    <span>Selecione aqui...</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                            locale={ptBR}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col gap-1 mt-1">
                                    <FormField
                                        control={form.control}
                                        name="dataFim"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-1">
                                                <FormLabel>Data Fim</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={"outline"}
                                                                className={cn("h-11 bg-zinc-50 border-zinc-300 pl-3 text-left", 
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                                >
                                                                {field.value ? (format(field.value, "PPP", { locale: ptBR })) : (
                                                                    <span>Selecione aqui...</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                            locale={ptBR}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <FormField 
                                        control={form.control}
                                        name="quantidadeConvite"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quantidade de Convites</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} 
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <FormField 
                                        control={form.control}
                                        name="valorConvite"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Valor do Convite</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} 
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-1 mt-1">
                                    <FormField
                                        control={form.control}
                                        name="dataLimitePagamento"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-1">
                                                <FormLabel>Data Limite Pagamento</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={"outline"}
                                                                className={cn("h-11 bg-zinc-50 border-zinc-300 pl-3 text-left", 
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                                >
                                                                {field.value ? (format(field.value, "PPP", { locale: ptBR })) : (
                                                                    <span>Selecione aqui...</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                            locale={ptBR}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col gap-1"></div>

                                <div className="flex items-center gap-2 mt-8">
                                    <button type="submit" className="botao primario">
                                        <IconDeviceFloppy width={18} height={18} />
                                        <span>Salvar</span>
                                    </button>
                                    <Link href="/periodoInscricao" className="botao secundario">
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