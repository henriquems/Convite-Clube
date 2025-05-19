import { Boleto, Pedido, StatusBoleto, StatusEnvio } from "@conviteclube/core";
import useAPI from "./useAPI";

export default function useBoleto() {
    const { httpPost, httpGet } = useAPI()

    const recuperarBoleto = async (id: number): Promise<Boleto> => {
        return await httpGet(`/boletos/${id}`);
    };

    const recuperarUltimoBoletoDoPedido = async (id: number): Promise<Boleto> => {
        return await httpGet(`/boletos/pedido/${id}`);
    };

    const abrirBoleto = async (boleto: Boleto) => {
        if (!boleto.id) {
            console.error('ID do boleto inválido');
            return;
        }

        try {
            const url = `/api/boleto?id=${boleto.id}`;
            const novaJanela = window.open(url, '_blank');
    
            if (!novaJanela) {
                alert('Não foi possível abrir o boleto. Verifique se o navegador está bloqueando pop-ups.');
            }
        } catch (e) {
            console.error('Erro ao abrir o boleto:', e);
        }
    }

    const cadastrar = async (pedido: Pedido) => {
        const idBoleto = await httpPost('/boletos/cadastro', {
            pedido: pedido,
            identificadorConvenio: "318647",
            referenciaTransacao: "",
            valor: Math.round(pedido.valorPedido * 100),
            quantidadePontos: "0",
            tipoPagamento: "2",
            cpfCnpj: pedido.usuario.cpf,
            indicadorPessoa: "1",
            valorDesconto: "0",
            dataLimiteDesconto: "",
            tipoDuplicata: "DS",
            urlRetorno: "http://conviteclube.feluma.org.br",
            urlInforma: "",
            nome: pedido.usuario.nome,
            endereco: "Rua Rosinha Sigaud",
            cidade: "Belo Horizonte",
            estado: "Minas Gerais",
            cep: "30337560",
            mensagem: "Favor não receber após o vencimento",
            statusBoleto: StatusBoleto.AGUARDANDO,
            statusEnvio: StatusEnvio.NAO,
            valorPagamento: "",
            tarifaBancaria: "",
            dataVencimento: calcularDataVencimento(pedido),
            dataPagamento: null,
            dataBoleto: new Date()
        });

        return idBoleto;
    }

    const calcularDataVencimento = (pedido: Pedido) => {
        const agora = new Date();
        const novaData = new Date(agora);
        novaData.setDate(novaData.getDate() + 2);
        const dataLimite = new Date(pedido.periodoInscricao.dataLimitePagamento);
        const dataVencimento = novaData > dataLimite ? dataLimite : novaData;

        return dataVencimento
    }

    const verificarEmissao = async (pedido: Pedido, onEmitido: (boleto: Boleto) => void) => {
        const ultimoBoleto = await recuperarUltimoBoletoDoPedido(pedido.id ?? 0);
      
        const emitir = async () => {
            const id = await cadastrar(pedido);
            const novoBoleto = await recuperarBoleto(id);
            onEmitido(novoBoleto);
        };
      
        if (ultimoBoleto) {
            if (ultimoBoleto.tipoPagamento === "21") {
                await emitir();
            } else if (new Date(ultimoBoleto.dataVencimento) < new Date()) {
                await emitir();
            } else {
                onEmitido(ultimoBoleto);
            }
        } else {
            await emitir();
        }
    };

    return {
        abrirBoleto, verificarEmissao
    }
}