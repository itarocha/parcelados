import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Parcela } from "./parcela.entity";
import { Cartao } from "./cartao.entity";
import { Categoria } from "./categoria.entity";

@Entity()
export class Compra {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'data_compra',
        type: 'date',
        nullable: false,
    })
    dataCompra: Date;

    @ManyToOne(() => Cartao)
    @JoinColumn({name: 'cartao_id', referencedColumnName: 'id'})
    cartao: Cartao;

    @ManyToOne(() => Categoria)
    @JoinColumn({name: 'categoria_id', referencedColumnName: 'id'})
    categoria: Categoria;

    @Column({
        name: 'descricao_compra',
        type: 'varchar',
        length: 128,
        nullable: false,
    })
    descricaoCompra: string;

    @Column({
        name: 'nome_loja',
        type: 'varchar',
        length: 64,
        nullable: false,
    })
    nomeLoja: string;

    @Column({
        name: 'valor_compra',
        type: 'decimal',
        precision: 6,
        scale: 2,
        nullable: false,
    })
    valorCompra: number;

    @Column({
        name: 'quantidade_parcelas',
        type: 'int',
        nullable: false
    })
    quantidadeParcelas: number;

    @OneToMany(() => Parcela, (parcela) => parcela.compra, 
    { onDelete: "CASCADE", onUpdate: "CASCADE" })
    parcelas: Parcela[];

}
