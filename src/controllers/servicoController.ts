import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Servico } from '../entities/Servico';

const tratarErro = (res: Response, mensagem: string, error?: unknown) => {
  return res.status(500).json({ error: mensagem, detalhe: error });
};

const getRepository = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  return AppDataSource.getRepository(Servico);
};

export const listarServicos = async (_req: Request, res: Response) => {
  try {
    const repository = await getRepository();
    const servicos = await repository.find({ order: { id: 'ASC' } });
    return res.json(servicos);
  } catch (error) {
    return tratarErro(res, 'Erro ao listar serviços', error);
  }
};

export const criarServico = async (req: Request, res: Response) => {
  try {
    const repository = await getRepository();
    const servico = repository.create(req.body);
    const salvo = await repository.save(servico);
    return res.status(201).json(salvo);
  } catch (error) {
    return tratarErro(res, 'Erro ao criar serviço', error);
  }
};
