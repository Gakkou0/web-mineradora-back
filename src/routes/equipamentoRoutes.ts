import { Router } from 'express';
import {
  atualizarEquipamento,
  buscarEquipamentoPorId,
  criarEquipamento,
  listarEquipamentos,
  removerEquipamento,
} from '../controllers/equipamentoController';

const router = Router();

router.get('/', listarEquipamentos);
router.post('/', criarEquipamento);
router.get('/:id', buscarEquipamentoPorId);
router.put('/:id', atualizarEquipamento);
router.delete('/:id', removerEquipamento);

export default router;
