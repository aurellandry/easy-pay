import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  create,
  getAll,
  get,
  update,
  remove,
} from '../controllers/establishmentController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getAll)
  .post(protect, create);

router
  .route('/:id')
  .get(protect, get)
  .put(protect, update)
  .delete(protect, remove);

export default router;
