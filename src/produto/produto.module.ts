import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './services/produto.service';
import { ProdutoController } from './controllers/produto.controller';
import { Categoria } from '../categoria/entities/categoria.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Produto, Categoria])],
    controllers: [ProdutoController],
    providers: [ProdutoService],
})
export class ProdutoModule {}
