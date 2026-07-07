import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Equipamento } from '../entities/Equipamento';
import { Cidade } from '../entities/Cidade';
import { Funcionario } from '../entities/Funcionario';
import { Servico } from '../entities/Servico';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'mineradora',
  synchronize: false,
  logging: false,
  entities: [Equipamento, Cidade, Funcionario, Servico],
  migrations: ['src/migrations/*.ts'],
});
