import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Cidade } from '../entities/Cidade';

const tratarErro = (res: Response, mensagem: string, error?: unknown) => {
  return res.status(500).json({ error: mensagem, detalhe: error });
};

const getRepository = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  return AppDataSource.getRepository(Cidade);
};

export const listarCidades = async (_req: Request, res: Response) => {
  try {
    const repository = await getRepository();
    const cidades = await repository.find({ order: { id: 'ASC' } });
    return res.json(cidades);
  } catch (error) {
    return tratarErro(res, 'Erro ao listar cidades', error);
  }
};

export const criarCidade = async (req: Request, res: Response) => {
  try {
    const repository = await getRepository();
    const cidade = repository.create(req.body);
    const salvo = await repository.save(cidade);
    return res.status(201).json(salvo);
  } catch (error) {
    return tratarErro(res, 'Erro ao criar cidade', error);
  }
};
