import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import {DataSource} from "typeorm";

describe('Check (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        dataSource = app.get(DataSource);
    });

    it('deve conectar ao banco', async () => {
        const result = await dataSource.query('SELECT 1');
        expect(result).toBeDefined();
    });

    afterAll(async () => {
        await app.close();
    });
});
