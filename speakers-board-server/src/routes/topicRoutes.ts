import { Router } from 'express';
import TopicController from '../controllers/topicController';

const router = Router();
const topicController = new TopicController();

router.get('/', topicController.getAllTopics.bind(topicController));
router.post('/', topicController.addTopic.bind(topicController));
router.delete('/:topic', topicController.deleteTopic.bind(topicController));

export default router;