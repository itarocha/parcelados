import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Compra } from "./compra.entity";

@Entity()
export class Parcela {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Compra, (compra) => compra.parcelas)
    @JoinColumn({ name: 'compra_id', referencedColumnName: 'id'})
    compra: Compra;

    @Column({
        name: 'data_vencimento',
        type: 'date',
        nullable: false,
    })
    dataVencimento: Date;

    @Column({
        name: 'valor_parcela',
        type: 'decimal',
        precision: 6,
        scale: 2,
        nullable: false,
    })
    valorParcela: number;

    @Column({
        name: 'sequencial_parcela',
        type: 'int',
        nullable: false
    })
    sequencialParcela: number;

}
