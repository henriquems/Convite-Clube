export interface RelatorioRetornoSaida {
    arquivo: string;
    boleto: string;
    status: string;
    data_processamento: string;
    motivo: string;
    valorBol: number;
    valorDescBol: number;
    valorPAGO: number;
    tarifa: number;
    dataliq: string | null;
    dataCred: string | null;
    tipo: string;
}