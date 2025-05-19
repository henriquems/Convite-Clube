'use client'
import { Usuario } from '@conviteclube/core'
import { createContext, useCallback, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import cookie from 'js-cookie'

interface Sessao {
    token: string | null
    usuario: Usuario | null
}

interface ContextoSessaoProps {
    carregando: boolean
    token: string | null
    usuario: Usuario | null
    iniciarSessao: (token: string) => void
    encerrarSessao: () => void
    isAdministrador: () => boolean
}

const ContextoSessao = createContext<ContextoSessaoProps>({} as any)
export default ContextoSessao

export function ProvedorSessao(props: any) {
    const nomeCookie = '_conviteclube_token'

    const [carregando, setCarregando] = useState(true)
    const [sessao, setSessao] = useState<Sessao>({ token: null, usuario: null })

    const carregarSessao = useCallback(function () {
        try {
            setCarregando(true)
            const sessao = obterSessao()
            setSessao(sessao)
        } finally {
            setCarregando(false)
        }
    }, [])

    useEffect(() => {
        carregarSessao()
    }, [carregarSessao])

    function iniciarSessao(token: string) {
        cookie.set(nomeCookie, token, { expires: 1 })
        const sessao = obterSessao()
        setSessao(sessao)
    }

    function encerrarSessao() {
        cookie.remove(nomeCookie)
        setSessao({ token: null, usuario: null })
    }

    function obterSessao(): Sessao {
        const token = cookie.get(nomeCookie)

        if (!token) {
            return { token: null, usuario: null }
        }

        try {
            const payload: any = jwtDecode(token)
            const valido = payload.exp! > Date.now() / 1000

            if (!valido) {
                return { token: null, usuario: null }
            }

            return {
                token,
                usuario: {
                    id: payload.id,
                    nome: payload.nome,
                    email: payload.email,
                    login: payload.login,
                    cpf: payload.cpf,
                    status: payload.status,
                    perfis: payload.perfis
                },
            }
        } catch (e) {
            return { token: null, usuario: null }
        }
    }

    function isAdministrador(): boolean {
        return !!sessao.usuario?.perfis?.some(perfil => perfil.nome === 'ADMINISTRADOR')
    }

    return (
        <ContextoSessao.Provider
            value={{
                carregando,
                token: sessao.token,
                usuario: sessao.usuario,
                iniciarSessao,
                encerrarSessao,
                isAdministrador,
            }}
        >
            {props.children}
        </ContextoSessao.Provider>
    )
}
