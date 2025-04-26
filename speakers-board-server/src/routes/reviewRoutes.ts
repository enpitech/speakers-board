import { Router } from 'express';
import ReviewController from '../controllers/reviewController';

const router = Router();
const reviewController = new ReviewController();

router.get('/', reviewController.getAllReviews.bind(reviewController));
router.get('/:id', reviewController.getReviewById.bind(reviewController));
router.get('/speaker/:speakerId', reviewController.getReviewsBySpeakerId.bind(reviewController));
router.post('/', reviewController.createReview.bind(reviewController));
router.put('/:id', reviewController.updateReview.bind(reviewController));
router.delete('/:id', reviewController.deleteReview.bind(reviewController));

export default router;