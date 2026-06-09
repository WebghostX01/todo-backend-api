import {createTodo, getTodos, updateTodo, deleteTodo, completeTodo} from '../controllers/todoController.js';
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTodo);
router.get('/', authMiddleware, getTodos);
router.put('/:id', authMiddleware, updateTodo);
router.delete('/:id', authMiddleware, deleteTodo);
router.patch('/:id/complete', authMiddleware, completeTodo);

export default router;