import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cartao {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 32,
        nullable: false,
    })
    nome: string;

    @Column({
        type: "varchar",
        length: 16,
        nullable: false,
    })
    bandeira: string;

    @Column({
        name: 'melhor_dia',
        type: 'int',
        nullable: false,
    })
    melhorDia: number;

    @Column({
        name: 'dia_vencimento',
        nullable: false,
    })
    diaVencimento: number;

    @Column({
        name: 'valor_limite',
        type: 'decimal', 
        precision: 9, 
        scale: 2,
        nullable: false,
    })
    valorLimite: number;

    @Column({
        name: 'numero_final',
        type: 'varchar',
        length: 32,
        nullable: false,
    })
    numeroFinal: string;

    @Column({
        type: 'varchar',
        length: 32,
        nullable: false,
    })
    dono: string;

    @Column({
        type: 'varchar',
        length: 32,
        nullable: false
    })
    banco: string;
}
