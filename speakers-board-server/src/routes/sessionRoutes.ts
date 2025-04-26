import { Router } from 'express';
import SessionController from '../controllers/sessionController';

const router = Router();
const sessionController = new SessionController();

router.get('/', sessionController.getAllSessions.bind(sessionController));
router.get('/:id', sessionController.getSessionById.bind(sessionController));
router.post('/', sessionController.createSession.bind(sessionController));
router.put('/:id', sessionController.updateSession.bind(sessionController));
router.delete('/:id', sessionController.deleteSession.bind(sessionController));

export default router;
