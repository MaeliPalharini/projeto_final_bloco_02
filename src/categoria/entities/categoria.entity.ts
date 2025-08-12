import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

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
}
