import { Router } from 'express';
import { criarServico, listarServicos } from '../controllers/servicoController';

const router = Router();

router.get('/', listarServicos);
router.post('/', criarServico);

export default router;
