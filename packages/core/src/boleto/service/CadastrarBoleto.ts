import { StatusPagamento } from "../../pedido";
import CasoDeUso from "../../shared/CasoDeUso";
import Boleto from "../model/Boleto";
import RepositorioBoleto from "../provider/RepositorioBoleto";

export default class CadastrarBoleto implements CasoDeUso<Boleto, number> {
    constructor(private readonly repositorio: RepositorioBoleto){}

    async executar(boleto: Boleto): Promise<number> {    
        let idBoleto = 0;
        
        if(boleto.pedido.statusPagamento !== StatusPagamento.PAGO) {
            const gerado = await this.repositorio.existeBoletoGeradoParaPedido(boleto.pedido.id);
            
            if(!gerado) {
                idBoleto = await this.repositorio.salvar(boleto); 
            } else {
                const ultimoBoleto: Boleto = await this.repositorio.recuperarUltimoBoletoDoPedido(boleto.pedido.id);
                
                if(ultimoBoleto.tipoPagamento === "2") {
                    if(ultimoBoleto.dataVencimento > new Date()){
                        idBoleto = await this.repositorio.atualizar(boleto);
                    } else if(ultimoBoleto.dataVencimento < new Date()) {
                        idBoleto = await this.repositorio.salvar(boleto);
                    }
                } else if(ultimoBoleto.tipoPagamento === "21") {
                    idBoleto = await this.repositorio.salvar(boleto);
                } 
            }
        }

        return idBoleto;
    }
}