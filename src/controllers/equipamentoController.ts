import { Request, Response } from 'express';
import { supabase } from '../config/supabaseClient';

const tabela = 'equipamentos';

const tratarErro = (res: Response, mensagem: string, error?: unknown) => {
  return res.status(500).json({ error: mensagem, detalhe: error });
};

export const listarEquipamentos = async (_req: Request, res: Response) => {
  if (!supabase) {
    return tratarErro(res, 'Supabase não configurado');
  }

  const { data, error } = await supabase.from(tabela).select('*').order('id', { ascending: true });

  if (error) {
    return tratarErro(res, 'Erro ao listar equipamentos', error.message);
  }

  return res.json(data ?? []);
};

export const criarEquipamento = async (req: Request, res: Response) => {
  if (!supabase) {
    return tratarErro(res, 'Supabase não configurado');
  }

  const { data, error } = await supabase.from(tabela).insert(req.body).select().single();

  if (error) {
    return tratarErro(res, 'Erro ao criar equipamento', error.message);
  }

  return res.status(201).json(data);
};

export const buscarEquipamentoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!supabase) {
    return tratarErro(res, 'Supabase não configurado');
  }

  const { data, error } = await supabase.from(tabela).select('*').eq('id', id).single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Equipamento não encontrado' });
    }
    return tratarErro(res, 'Erro ao buscar equipamento', error.message);
  }

  return res.json(data);
};

export const atualizarEquipamento = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!supabase) {
    return tratarErro(res, 'Supabase não configurado');
  }

  const { data, error } = await supabase.from(tabela).update(req.body).eq('id', id).select().single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Equipamento não encontrado' });
    }
    return tratarErro(res, 'Erro ao atualizar equipamento', error.message);
  }

  return res.json(data);
};

export const removerEquipamento = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!supabase) {
    return tratarErro(res, 'Supabase não configurado');
  }

  const { data, error } = await supabase.from(tabela).delete().eq('id', id).select().single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Equipamento não encontrado' });
    }
    return tratarErro(res, 'Erro ao remover equipamento', error.message);
  }

  return res.json({ removido: data });
};
