export class CreateCompraDto {
    dataCompra: Date;
    descricaoCompra: string;
    cartaoId: number;
    categoriaId: number;
    nomeLoja: string;
    valorCompra: number;
    quantidadeParcelas: number;
}
