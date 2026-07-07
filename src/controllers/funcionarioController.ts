import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Funcionario } from '../entities/Funcionario';

const tratarErro = (res: Response, mensagem: string, error?: unknown) => {
  return res.status(500).json({ error: mensagem, detalhe: error });
};

const getRepository = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  return AppDataSource.getRepository(Funcionario);
};

export const listarFuncionarios = async (_req: Request, res: Response) => {
  try {
    const repository = await getRepository();
    const funcionarios = await repository.find({ order: { id: 'ASC' } });
    return res.json(funcionarios);
  } catch (error) {
    return tratarErro(res, 'Erro ao listar funcionários', error);
  }
};

export const criarFuncionario = async (req: Request, res: Response) => {
  try {
    const repository = await getRepository();
    const funcionario = repository.create(req.body);
    const salvo = await repository.save(funcionario);
    return res.status(201).json(salvo);
  } catch (error) {
    return tratarErro(res, 'Erro ao criar funcionário', error);
  }
};
