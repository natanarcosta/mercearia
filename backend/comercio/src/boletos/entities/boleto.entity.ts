import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Boleto{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    empresa: string;

    @Column()
    vencimento: string;

    @Column()
    valor: number;

    @Column()
    pago: boolean;
}