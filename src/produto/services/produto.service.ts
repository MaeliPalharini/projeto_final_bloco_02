import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private readonly produtoRepository: Repository<Produto>,
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
    ) {}

    async findAll(): Promise<Produto[]> {
        return this.produtoRepository.find({
            relations: ['categoria'],
            order: { id: 'ASC' },
        });
    }

    async findById(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findOne({
            where: { id },
            relations: ['categoria'],
        });
        if (!produto) throw new NotFoundException('Produto não encontrado');
        return produto;
    }

    async produtosPorNome(nome: string): Promise<Produto[]> {
        if (!nome) throw new BadRequestException('O nome do produto é obrigatório');

        const itens = await this.produtoRepository.find({
            where: { nome: Like(`%${nome}%`) },
            relations: ['categoria'],
            order: { nome: 'ASC' },
        });

        if (itens.length === 0) {
            throw new NotFoundException('Nenhum produto encontrado para esse nome.');
        }
        return itens;
    }

    async create(produto: Produto): Promise<Produto> {
        if (!produto.categoria || !produto.categoria.id) {
            throw new BadRequestException('Informe a categoria do produto (categoria.id).');
        }
        const categoria = await this.categoriaRepository.findOneBy({ id: produto.categoria.id });
        if (!categoria) throw new NotFoundException('Categoria informada não existe');

        produto.categoria = categoria;
        return this.produtoRepository.save(produto);
    }

    async update(id: number, produto: Produto): Promise<Produto> {
        const existente = await this.produtoRepository.findOneBy({ id });
        if (!existente) throw new NotFoundException('Produto não encontrado');

        if (!produto.categoria?.id) {
            throw new BadRequestException('categoria.id é obrigatório');
        }

        const categoria = await this.categoriaRepository.findOneBy({ id: produto.categoria.id });
        if (!categoria) throw new NotFoundException('Categoria informada não existe');

        produto.id = id;
        produto.categoria = categoria;
        return this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<void> {
        const existente = await this.produtoRepository.findOneBy({ id });
        if (!existente) throw new NotFoundException('Produto não encontrado');
        await this.produtoRepository.delete(id);
    }
}
