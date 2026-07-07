import { Router } from 'express';
import { criarEquipamento, listarEquipamentos } from '../controllers/equipamentoController';

const router = Router();

router.get('/', listarEquipamentos);
router.post('/', criarEquipamento);

export default router;
