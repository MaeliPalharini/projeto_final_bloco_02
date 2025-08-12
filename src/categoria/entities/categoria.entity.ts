import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import {Produto} from "../../produto/entities/produto.entity";

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nome: string;

    @Column({ length: 255, nullable: true,  })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    descricao?: string;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produtos?: Produto[];
}
