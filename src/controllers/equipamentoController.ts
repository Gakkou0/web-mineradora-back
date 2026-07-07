import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Equipamento } from '../entities/Equipamento';

const tratarErro = (res: Response, mensagem: string, error?: unknown) => {
  return res.status(500).json({ error: mensagem, detalhe: error });
};

const parseId = (id: string | string[] | undefined) => {
  if (typeof id !== 'string') {
    return null;
  }

  const valor = Number(id);
  return Number.isInteger(valor) ? valor : null;
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

export const buscarEquipamentoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumerico = parseId(id);

  if (!idNumerico) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const repository = await getRepository();
    const equipamento = await repository.findOneBy({ id: idNumerico });

    if (!equipamento) {
      return res.status(404).json({ error: 'Equipamento não encontrado' });
    }

    return res.json(equipamento);
  } catch (error) {
    return tratarErro(res, 'Erro ao buscar equipamento', error);
  }
};

export const atualizarEquipamento = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumerico = parseId(id);

  if (!idNumerico) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const repository = await getRepository();
    const equipamento = await repository.findOneBy({ id: idNumerico });

    if (!equipamento) {
      return res.status(404).json({ error: 'Equipamento não encontrado' });
    }

    repository.merge(equipamento, req.body);
    const atualizado = await repository.save(equipamento);
    return res.json(atualizado);
  } catch (error) {
    return tratarErro(res, 'Erro ao atualizar equipamento', error);
  }
};

export const removerEquipamento = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumerico = parseId(id);

  if (!idNumerico) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const repository = await getRepository();
    const equipamento = await repository.findOneBy({ id: idNumerico });

    if (!equipamento) {
      return res.status(404).json({ error: 'Equipamento não encontrado' });
    }

    await repository.remove(equipamento);
    return res.json({ removido: true, equipamento });
  } catch (error) {
    return tratarErro(res, 'Erro ao remover equipamento', error);
  }
};
