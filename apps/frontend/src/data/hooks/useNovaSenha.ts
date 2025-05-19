import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAPI from "./useAPI";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

const novaSenhaSchema = z.object({
    email: z.string().min(1, { message: "Favor informar o campo e-mail!" }),
});

export default function useNovaSenha() {
    const { httpPost } = useAPI()
    const router = useRouter()
    const [ email, setEmail ] = useState("") 
    
    const form = useForm<z.infer<typeof novaSenhaSchema>>({
        resolver: zodResolver(novaSenhaSchema),
        defaultValues: {
            email: "",
        }
    })

    const gerarNovaSenha = async () => {
        try {
            const resposta = await httpPost('/usuarios/novaSenha', {
                email: form.getValues("email"), 
            });

            setEmail(resposta)

            toast.success(`Senha enviada para o e-mail ${resposta.email}`);
            router.push("/");
        } catch (error: any) {
            const mensagem = error?.data?.message || error?.message || 'Erro ao tentar alterar a senha';
            toast.error(mensagem);
        }
    }

    return { gerarNovaSenha, form}
}

