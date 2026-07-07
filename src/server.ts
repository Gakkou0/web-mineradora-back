import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import equipamentoRoutes from './routes/equipamentoRoutes';
import { AppDataSource } from './config/data-source';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'API da mineradora online' });
});

app.get('/health', async (_req, res) => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    return res.json({ ok: true, message: 'PostgreSQL conectado' });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Falha ao conectar ao PostgreSQL',
      error: error instanceof Error ? error.message : error,
    });
  }
});

app.use('/equipamentos', equipamentoRoutes);

const port = Number(process.env.PORT || 3000);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao PostgreSQL:', error);
    process.exit(1);
  });
