import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import equipamentoRoutes from './routes/equipamentoRoutes';
import { supabase } from './config/supabaseClient';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'API da mineradora online' });
});

app.get('/health', async (_req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ ok: false, message: 'Supabase não configurado' });
    }

    const { data, error } = await supabase.from('equipamentos').select('id').limit(1);
    if (error) {
      return res.status(500).json({ ok: false, message: 'Erro ao acessar o Supabase', error: error.message });
    }

    return res.json({ ok: true, message: 'Supabase conectado', data });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Falha inesperada', error });
  }
});

app.use('/equipamentos', equipamentoRoutes);

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
