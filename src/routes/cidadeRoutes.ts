import { Router } from 'express';
import { criarCidade, listarCidades } from '../controllers/cidadeController';

const router = Router();

router.get('/', listarCidades);
router.post('/', criarCidade);

export default router;
