import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
    })
    descricao: string;

}
