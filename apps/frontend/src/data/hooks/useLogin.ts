import useAPI from "./useAPI";
import useSessao from "./useSessao";
import { z } from "zod";
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"

const loginSchema = z.object({
    login: z.string().min(1, { message: "Favor informar o campo login!" }),
    senha: z.string().min(1, { message: "Favor informar o campo senha!" }),
})

export default function useLogin() {
    const router = useRouter()
    const { httpPost } = useAPI()
    const { iniciarSessao, usuario } = useSessao()
    
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          login: "",
          senha: "",
        }
    })

    const logar = async () => {
        try {
            const token = await httpPost('/auth/logar', { 
                login: form.getValues("login"), 
                senha: form.getValues("senha"), 
            });
            iniciarSessao(token);
            router.push("/convite");
        } catch (error: any) {
            const mensagem = error?.data?.message || error?.message || 'Erro ao efetuar login';
            toast.warning(mensagem);
            form.setValue("senha", "");
        }
    }

    return {
        logar, form
    }
}