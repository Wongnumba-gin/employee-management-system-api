import { Router } from 'express';
import * as positionController from '../controllers/position.controller';

const router = Router();

router.post('/', positionController.createPosition);
router.get('/', positionController.getAllPositions);
router.get('/:id', positionController.getPositionById);
router.put('/:id', positionController.updatePosition);
router.delete('/:id', positionController.deletePosition);

export default router;
