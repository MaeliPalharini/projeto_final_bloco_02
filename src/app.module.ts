import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CategoriaModule} from "./categoria/categoria.module";
import {Categoria} from "./categoria/entities/categoria.entity";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
                type: 'mysql',
                host: cfg.get('DB_HOST'),
                port: Number(cfg.get('DB_PORT')),
                username: cfg.get('DB_USERNAME'),
                password: cfg.get('DB_PASSWORD'),
                database: cfg.get('DB_DATABASE'),
                synchronize: cfg.get('DB_SYNC') === 'true',
                entities: [Categoria]
            }),
        }),
        CategoriaModule,
    ],
})
export class AppModule {}
