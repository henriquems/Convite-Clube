import Boleto from './model/Boleto';
import RepositorioBoleto from './provider/RepositorioBoleto';
import { StatusBoleto } from './model/StatusBoleto';
import { StatusEnvio  } from './model/StatusEnvio';
import CadastrarBoleto from './service/CadastrarBoleto';
import RecuperarUltimoBoletoDoPedido from './service/RecuperarUltimoBoletoDoPedido';
import RecuperarBoleto from './service/RecuperarBoleto';
import AtualizarBoleto from './service/AtualizarBoleto';

export type { Boleto, RepositorioBoleto }
export { 
    StatusBoleto, StatusEnvio, CadastrarBoleto, 
    RecuperarUltimoBoletoDoPedido, RecuperarBoleto,
    AtualizarBoleto
}