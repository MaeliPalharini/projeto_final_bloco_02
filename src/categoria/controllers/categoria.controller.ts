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
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../entities/categoria.entity';

@Controller('/categorias')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async listarTodas(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async buscarPorId(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Categoria> {
        return this.categoriaService.findById(id);
    }

    @Get('nome/:nome')
    @HttpCode(HttpStatus.OK)
    async buscarPorNome(@Param('nome') nome: string): Promise<Categoria[]> {
        return this.categoriaService.CategoriasPorNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async criar(@Body() categoria: Categoria) {
        const categoriaCriada = await this.categoriaService.create(categoria);
        return {
            mensagem: 'Categoria criada com sucesso!',
            categoria: categoriaCriada,
        };
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async atualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() categoria: Categoria,
    ): Promise<Categoria> {
        return this.categoriaService.update(id, categoria);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deletar(@Param('id', ParseIntPipe) id: number) {
        await this.categoriaService.delete(id);
        return { mensagem: 'Categoria removida com sucesso!' };
    }
}
