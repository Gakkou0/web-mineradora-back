import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Equipamento } from '../entities/Equipamento';

const tratarErro = (res: Response, mensagem: string, error?: unknown) => {
  return res.status(500).json({ error: mensagem, detalhe: error });
};

const getRepository = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  return AppDataSource.getRepository(Equipamento);
};

export const listarEquipamentos = async (_req: Request, res: Response) => {
  try {
    const repository = await getRepository();
    const equipamentos = await repository.find({ order: { id: 'ASC' } });
    return res.json(equipamentos);
  } catch (error) {
    return tratarErro(res, 'Erro ao listar equipamentos', error);
  }
};

export const criarEquipamento = async (req: Request, res: Response) => {
  try {
    const repository = await getRepository();
    const equipamento = repository.create(req.body);
    const salvo = await repository.save(equipamento);
    return res.status(201).json(salvo);
  } catch (error) {
    return tratarErro(res, 'Erro ao criar equipamento', error);
  }
};
