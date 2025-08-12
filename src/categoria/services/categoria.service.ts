import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>){}

    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find();
    }

    async findById (id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOne({
            where: { id }
        });

        if (!categoria) {
            throw new NotFoundException('Categoria não encontrada');
        }
        return categoria;
    }

    async create(categoria: Categoria): Promise<Categoria> {
        return this.categoriaRepository.save(categoria);
    }

    async CategoriasPorNome(nome: string): Promise<Categoria[]> {
        if (!nome) {
            throw new BadRequestException('O nome da categoria é obrigatório');
        }

        const categorias = await this.categoriaRepository.find({
            where: { nome: Like(`%${nome}%`) },
            order: { nome: 'ASC' },
        });

        if (categorias.length === 0) {
            throw new NotFoundException('Nenhuma categoria encontrada para esse nome.');
        }
        return categorias;
    }

    async update(id: number, categoria: Categoria): Promise<Categoria> {
        const categoriaExistente = await this.categoriaRepository.findOneBy({id});

        if (!categoriaExistente) {
            throw new NotFoundException('Categoria não encontrada');
        }
        categoria.id = id;
        return this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<void> {
        const existente = await this.categoriaRepository.findOneBy({ id });
        if (!existente) {
            throw new NotFoundException('Categoria não encontrada');
        }
        await this.categoriaRepository.delete(id);
    }
}