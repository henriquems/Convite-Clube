import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { Boleto, StatusEnvio } from '@conviteclube/core'

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID do boleto não informado' }, { status: 400 })

    const cookieStore = await cookies()
    const token = cookieStore.get('_conviteclube_token')?.value

    if (!token) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

    const boleto = await recuperarBoleto(Number(id), token)

    if (!boleto) return NextResponse.json({ error: 'Boleto não encontrado' }, { status: 404 })

    const formParams = montarParametro(boleto)

    const resposta = await fetch('https://mpag.bb.com.br/site/mpag/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formParams,
    })

    const contentType = resposta.headers.get('Content-Type')

    if (contentType !== 'application/pdf') {
        const html = await resposta.text()

        console.error('Erro ao gerar boleto: conteúdo não é PDF.')
        console.error('Content-Type:', contentType)
        console.error('Resposta (início):', html.slice(0, 1000))

        return new NextResponse(html, {
            status: 400,
            headers: {
                'Content-Type': 'text/html; charset=UTF-8',
            },
        })
    }

    atualizar(boleto, token);

    const buffer = await resposta.arrayBuffer()

    return new NextResponse(buffer, {
        headers: {
            'Content-Type': 'application/pdf',
        },
    })
}

async function atualizar(boleto: Boleto, token: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!token) {
        console.error("Token não encontrado. Usuário não autenticado.");
        return;
    }

    try {
        const boletoAtualizado = {
            ...boleto,
            tipoPagamento: "21",
            statusEnvio: StatusEnvio.SIM
        }

        const res = await fetch(`${apiUrl}/boletos`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(boletoAtualizado),
        });

        if (!res.ok) {
            const erro = await res.text();
            console.error("Erro ao atualizar boleto:", erro);
        }
    } catch (error) {
        console.error("Erro na requisição de atualização do boleto:", error);
    }
}

async function recuperarBoleto(id: number, token: string): Promise<Boleto | null> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    try {
        const res = await fetch(`${apiUrl}/boletos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!res.ok) return null
        return await res.json()
    } catch (err) {
        console.error("Erro ao recuperar boleto:", err)
        return null
    }
}

function montarParametro(boleto: any): string {
    const formatarData = (dataStr: string) => {
        const data = new Date(dataStr)
        const dia = String(data.getDate()).padStart(2, '0')
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const ano = String(data.getFullYear())
        return `${dia}${mes}${ano}`
    }

    const encode = encodeURIComponent

    const dataLimiteDesconto = boleto.dataLimiteDesconto
        ? formatarData(boleto.dataLimiteDesconto)
        : ''
    const urlInforma = boleto.urlInforma ?? ''
    const msgLoja = boleto.mensagem ?? ''

    return [
        `idConv=${encode(boleto.identificadorConvenio)}`,
        `refTran=${encode(boleto.referenciaTransacao)}`,
        `valor=${encode(boleto.valor)}`,
        `qtdPontos=${encode(boleto.quantidadePontos)}`,
        `dtVenc=${formatarData(boleto.dataVencimento)}`,
        `tpPagamento=${encode(boleto.tipoPagamento)}`,
        `cpfCnpj=${encode(boleto.cpfCnpj.replace(/\D/g, ''))}`,
        `indicadorPessoa=${encode(boleto.indicadorPessoa)}`,
        `valorDesconto=${encode(boleto.valorDesconto)}`,
        `dataLimiteDesconto=${encode(dataLimiteDesconto)}`,
        `tpDuplicata=${encode(boleto.tipoDuplicata)}`,
        `urlRetorno=${encode(boleto.urlRetorno)}`,
        `urlInforma=${encode(urlInforma)}`,
        `nome=${encode(boleto.nome)}`,
        `endereco=${encode(boleto.endereco)}`,
        `cidade=${encode(boleto.cidade)}`,
        `uf=${encode(boleto.estado)}`,
        `cep=${encode(boleto.cep.replace(/\D/g, ''))}`,
        `msgLoja=${encode(msgLoja)}`,
    ].join('&')
}