import { Router } from 'express';
import { criarFuncionario, listarFuncionarios } from '../controllers/funcionarioController';

const router = Router();

router.get('/', listarFuncionarios);
router.post('/', criarFuncionario);

export default router;
