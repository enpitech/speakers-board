import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Review } from '../types';

class ReviewController {
  private dbPath = path.join(__dirname, '../../../db/db.json');

  private getDatabase() {
    const data = fs.readFileSync(this.dbPath, 'utf8');
    return JSON.parse(data);
  }

  private saveDatabase(data: any) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
  }

  getAllReviews(req: Request, res: Response) {
    try {
      const db = this.getDatabase();
      res.json(db.reviews || []);
    } catch (error) {
      console.error('Error getting reviews:', error);
      res.status(500).json({ message: 'Error fetching reviews' });
    }
  }

  getReviewById(req: Request, res: Response) {
    try {
      const reviewId = req.params.id;
      const db = this.getDatabase();
      const review = db.reviews?.find((review: Review) => review.id === reviewId);
      
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      
      res.json(review);
    } catch (error) {
      console.error('Error getting review by ID:', error);
      res.status(500).json({ message: 'Error fetching review' });
    }
  }

  getReviewsBySpeakerId(req: Request, res: Response) {
    try {
      const speakerId = req.params.speakerId;
      const db = this.getDatabase();
      const speakerReviews = db.reviews?.filter((review: Review) => review.speakerId === speakerId) || [];
      res.json(speakerReviews);
    } catch (error) {
      console.error('Error getting reviews by speaker ID:', error);
      res.status(500).json({ message: 'Error fetching reviews' });
    }
  }

  createReview(req: Request, res: Response) {
    try {
      const db = this.getDatabase();
      const newReview: Review = {
        id: uuidv4(),
        date: new Date().toISOString(),
        ...req.body
      };

      if (!db.reviews) {
        db.reviews = [];
      }
      
      db.reviews.push(newReview);
      this.saveDatabase(db);
      
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ message: 'Error creating review' });
    }
  }

  updateReview(req: Request, res: Response) {
    try {
      const reviewId = req.params.id;
      const db = this.getDatabase();
      
      const reviewIndex = db.reviews.findIndex((review: Review) => review.id === reviewId);
      
      if (reviewIndex === -1) {
        return res.status(404).json({ message: 'Review not found' });
      }
      
      db.reviews[reviewIndex] = {
        ...db.reviews[reviewIndex],
        ...req.body,
        id: reviewId // Ensure ID doesn't change
      };
      
      this.saveDatabase(db);
      res.json(db.reviews[reviewIndex]);
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({ message: 'Error updating review' });
    }
  }

  deleteReview(req: Request, res: Response) {
    try {
      const reviewId = req.params.id;
      const db = this.getDatabase();
      
      const reviewIndex = db.reviews.findIndex((review: Review) => review.id === reviewId);
      
      if (reviewIndex === -1) {
        return res.status(404).json({ message: 'Review not found' });
      }
      
      db.reviews.splice(reviewIndex, 1);
      this.saveDatabase(db);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ message: 'Error deleting review' });
    }
  }
}

export default ReviewController;