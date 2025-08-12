import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, ValidateNested} from 'class-validator';
import { Categoria } from '../../categoria/entities/categoria.entity';
import {Type} from "class-transformer";

@Entity('produtos')
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    nome: string;

    @Column('decimal', { precision: 10, scale: 2 })
    @IsNumber()
    @Min(0)
    preco: number;

    @Column({ nullable: true, length: 255 })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    descricao?: string;

    @ManyToOne(() => Categoria, (
        categoria) => categoria.produtos, {
        nullable: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'categoria_id' })
    @IsDefined({ message: 'categoria é obrigatória' })
    categoria: Categoria;
}
