import { Usuario } from "@conviteclube/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAPI from "./useAPI";
import usePerfil from "./usePerfil";

const perfilSchema = z.object({
    id: z.number().optional(),
    nome: z.string(),
    descricao: z.string()
})

const schemaBase = {
    id: z.number().optional(),
    status: z.string().min(1, { message: "Favor informar o campo status!" }),
    perfis: z.array(perfilSchema).min(1, "Favor informar o campo perfil!"),
    nome: z.string().min(1, { message: "Favor informar o campo nome!" }),
    cpf: z.string().min(1, { message: "Favor informar o campo cpf!" }),
    email: z.string().min(1, { message: "Favor informar o campo e-mail!" }),
    login: z.string().min(1, { message: "Favor informar o campo login!" }),
};

const schemaCriacao = z.object({
    ...schemaBase,
    senha: z.string().min(1, { message: "Favor informar o campo senha!" }),
    repitaSenha: z.string().min(1, { message: "Favor informar o campo repita senha!" }),
    }).refine((data) => data.senha === data.repitaSenha, {
    path: ["repitaSenha"],
    message: "As senhas não coincidem!",
});

const schemaEdicao = z.object({
    ...schemaBase,
    senha: z.string().optional(),
    repitaSenha: z.string().optional(),}).refine((data) => {
    if (!data.senha && !data.repitaSenha) return true; 
    if (data.senha && data.repitaSenha) return data.senha === data.repitaSenha;
    return false;
    }, {
    path: ["repitaSenha"],
    message: "As senhas não coincidem!",
});

export default function useUsuario() {
    const router = useRouter()
    const params = useParams()
    const modoEdicao = !!params.id
    const [ mensagem, setMensagem ] = useState("");
    const [ usuarios, setUsuarios ] = useState<Usuario[]>([])
    const [ total, setTotal ] = useState(0);

    const { perfis } = usePerfil()

    const { httpGet, httpPost, httpDelete } = useAPI()

    const searchParams = useSearchParams()
    const page: number = parseInt(searchParams.get('page') || "1")
    const pageSize: number = parseInt(searchParams.get('pageSize') || "10")

    const schema = useMemo(() => modoEdicao ? schemaEdicao : schemaCriacao, [modoEdicao]);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
        status: "",
        perfis: [],
        nome: "",
        cpf: "",
        email: "",
        login: "",
        senha: "",
        repitaSenha: "",
        }
    })

    const listar = useCallback(async function () {
        const resposta = await httpGet(`/usuarios?page=${page}&pageSize=${pageSize}`);
        setUsuarios(resposta.usuarios ?? []);
        setTotal(resposta.total);
    }, [httpGet, page, pageSize]);

    const salvar = async () => {
        await httpPost('/usuarios/cadastro', {
            id: form.getValues("id"),
            nome: form.getValues("nome"), 
            email: form.getValues("email"), 
            login: form.getValues("login"), 
            senha: form.getValues("senha"), 
            cpf: form.getValues("cpf"), 
            status: form.getValues("status"), 
            perfis: form.getValues("perfis")
        })
        toast.success("Usuário salvo com sucesso!")
        router.push("/usuario")
    }

    const excluir = async (id: number) => {
        await httpDelete(`/usuarios/${id}`)
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id))
        setTotal(total - 1);
        toast.success("Usuário excluído com sucesso!")
    }

    const recuperarUsuariosDoCurso = async (cursoId: number) => {
        const resposta = await httpGet(`/usuarios/curso/${cursoId}`);
        setUsuarios(resposta ?? []);
    }

    const reset = useCallback(form.reset, [form.reset]);

    const recuperar = useCallback(
        async (id: number) => {
        const usuario = await httpGet(`/usuarios/${id}`);
        if (usuario) {
            reset({
            id: usuario.id,
            status: usuario.status || "",
            perfis: usuario.perfis || [],
            nome: usuario.nome || "",
            cpf: usuario.cpf || "",
            email: usuario.email || "",
            login: usuario.login || "",
            senha: "",
            repitaSenha: "",
            });
        }
        },
        [httpGet, reset]
    );

    useEffect(() => {
        if (params.id && !isNaN(Number(params.id))) {
            recuperar(Number(params.id));
        } else {
            listar();
        }
    }, [params.id, page, pageSize, listar, recuperar]);

    return {
        usuarios, page, pageSize, total, mensagem, form, perfis,
        excluir, salvar, setMensagem, recuperarUsuariosDoCurso
    }
}