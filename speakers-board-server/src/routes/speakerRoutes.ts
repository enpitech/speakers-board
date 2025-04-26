import { Router } from 'express';
import SpeakerController from '../controllers/speakerController';

const router = Router();
const speakerController = new SpeakerController();

router.get('/', speakerController.getAllSpeakers.bind(speakerController));
router.get('/:id', speakerController.getSpeakerById.bind(speakerController));
router.post('/', speakerController.createSpeaker.bind(speakerController));
router.put('/:id', speakerController.updateSpeaker.bind(speakerController));
router.delete('/:id', speakerController.deleteSpeaker.bind(speakerController));

export default router;
