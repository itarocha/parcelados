import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompraDto } from '../../dtos/compras/create-compra.dto';
import { UpdateCompraDto } from '../../dtos/compras/update-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Compra } from 'src/typeorm/entities/compra.entity';
import { Repository } from 'typeorm';
import { Parcela } from 'src/typeorm/entities/parcela.entity';
import { Cartao } from 'src/typeorm/entities/cartao.entity';
import { Categoria } from 'src/typeorm/entities/categoria.entity';
import { DateTime } from "luxon";

@Injectable()
export class ComprasService {

  constructor(
    @InjectRepository(Compra) private repoCompra: Repository<Compra>,
    @InjectRepository(Parcela) private repoParcela: Repository<Parcela>,
    @InjectRepository(Cartao) private repoCartao: Repository<Cartao>,
    @InjectRepository(Categoria) private repoCategoria: Repository<Categoria>,
  ){  }

  async create(model: CreateCompraDto) {
    const cartao = await this.repoCartao.findOneBy( { id: model.cartaoId })
    if (!cartao){
      throw new HttpException(
        `Cartão não encontrado ${model.cartaoId}`,
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    const categoria = await this.repoCategoria.findOneBy( { id: model.categoriaId })
    if (!categoria){
      throw new HttpException(
        `Categoria não encontrada ${model.categoriaId}`,
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    if (model.quantidadeParcelas < 1){
      throw new HttpException(
        'Quantidade de parcelas deve ser igual ou superior a 1',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    if (model.valorCompra < 1){
      throw new HttpException(
        'Valor da Compra deve ser pelo menos superior a 1',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    let hoje = DateTime.now()
    const dataCompra = DateTime.fromISO(model.dataCompra.toString())

    if (dataCompra > hoje){
      throw new HttpException(
        `Data da Compra (${dataCompra}) deve ser igual ou superior a data atual (${hoje})`,
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }

    let valorParcela = this.truncarValor(model.valorCompra / model.quantidadeParcelas)
    let valorResto = model.valorCompra - (valorParcela * model.quantidadeParcelas)
    valorResto = parseFloat(valorResto.toFixed(2));
    let valorPrimeiraParcela = parseFloat((valorParcela + valorResto).toFixed(2))

    const diaVencimento = cartao.diaVencimento;
    const melhorDia = cartao.melhorDia;
    const diaCompra = dataCompra.day;
    const mesCompra = dataCompra.month;
    const anoCompra = dataCompra.year;

    var dataVencimento = DateTime.fromObject({
      day: diaVencimento, 
      month: mesCompra, 
      year: anoCompra, 
      hour: 0, 
      minute: 0, 
      second: 0, 
      millisecond: 0
    }, { zone: 'America/Sao_Paulo'})
    
    if (diaCompra > melhorDia) {
      dataVencimento = dataVencimento.plus({months: 1});
    }

    const parcelas = new Array<Parcela>()

    for (var i = 1; i <= model.quantidadeParcelas; i++) {
      const p = new Parcela();
      p.dataVencimento = dataVencimento.toJSDate();
      p.sequencialParcela = i;
      p.valorParcela = i === 1 ? valorPrimeiraParcela: valorParcela;

      const newParcela = await this.repoParcela.save(p)
      parcelas.push(newParcela)

      console.log(dataVencimento);
      dataVencimento = dataVencimento.plus({months: 1});
    }
    
    const newCompra = this.repoCompra.create({
      ...model,
      cartao,
      categoria,
      parcelas
    })

    return this.repoCompra.save(newCompra);
  }

  findAll() {
    return `This action returns all compras`;
  }

  async findOne(id: number) {
    const model = await this.repoCompra.createQueryBuilder("compra")
    .leftJoin("compra.cartao", "cartao")
    .leftJoinAndSelect("compra.parcelas", "parcelas")
    .select([
      "compra.id", 
      "compra.dataCompra", 
      "compra.descricaoCompra", 
      "compra.valorCompra",
      "compra.quantidadeParcelas",
      "compra.nomeLoja", 
      "cartao.id", 
      "cartao.nome",
      "cartao.dono",
      "cartao.bandeira",
      "parcelas.id",
      "parcelas.dataVencimento",
      "parcelas.valorParcela",
      "parcelas.sequencialParcela",
    ])
    .where("compra.id = :id", { id: id })
    .getOne();

    if (!model){
      throw new HttpException(
        'Compra não encontrada',
        HttpStatus.NOT_FOUND
      )
    }
    return model;
  }

  update(id: number, updateCompraDto: UpdateCompraDto) {
    return `This action updates a ${id} compra`;
  }

  async remove(id: number) {
    const compra = await this.repoCompra.findOneBy({ id })
    if (!compra){
      throw new HttpException(
        'Comra não encontrada',
        HttpStatus.NOT_FOUND
      )
    }
    this.repoParcela.delete({compra : compra})

    return this.repoCompra.delete( { id })
  }

  truncarValor(numero: number) {
    const numeroStr = numero.toFixed(12)
    const dotPosition = numeroStr.indexOf(".")
    const strNumeroTruncado = numeroStr.substring(0, dotPosition+3)
    return parseFloat(strNumeroTruncado)
  }
  
}
