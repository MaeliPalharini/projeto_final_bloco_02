import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';

@Controller('/produtos')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    listarTodos(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    buscarPorId(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
        return this.produtoService.findById(id);
    }

    @Get('nome/:nome')
    @HttpCode(HttpStatus.OK)
    buscarPorNome(@Param('nome') nome: string): Promise<Produto[]> {
        return this.produtoService.produtosPorNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async criar(@Body() produto: Produto) {
        const criado = await this.produtoService.create(produto);
        return { mensagem: 'Produto criado com sucesso!', produto: criado };
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async atualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() produto: Produto,
    ): Promise<Produto> {
        return this.produtoService.update(id, produto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deletar(@Param('id', ParseIntPipe) id: number) {
        await this.produtoService.delete(id);
        return { mensagem: 'Produto removido com sucesso!' };
    }
}
