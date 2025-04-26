import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

class TopicController {
  private dbPath = path.join(__dirname, '../../../db/db.json');

  private getDatabase() {
    const data = fs.readFileSync(this.dbPath, 'utf8');
    return JSON.parse(data);
  }

  private saveDatabase(data: any) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
  }

  getAllTopics(req: Request, res: Response) {
    try {
      const db = this.getDatabase();
      res.json(db.topics || []);
    } catch (error) {
      console.error('Error getting topics:', error);
      res.status(500).json({ message: 'Error fetching topics' });
    }
  }

  addTopic(req: Request, res: Response) {
    try {
      const { topic } = req.body;
      if (!topic) {
        return res.status(400).json({ message: 'Topic is required' });
      }

      const db = this.getDatabase();
      
      if (!db.topics) {
        db.topics = [];
      }
      
      // Check if topic already exists
      if (db.topics.includes(topic)) {
        return res.status(409).json({ message: 'Topic already exists' });
      }
      
      db.topics.push(topic);
      this.saveDatabase(db);
      
      res.status(201).json({ topic });
    } catch (error) {
      console.error('Error adding topic:', error);
      res.status(500).json({ message: 'Error adding topic' });
    }
  }

  deleteTopic(req: Request, res: Response) {
    try {
      const { topic } = req.params;
      const db = this.getDatabase();
      
      if (!db.topics) {
        return res.status(404).json({ message: 'No topics found' });
      }
      
      const initialLength = db.topics.length;
      db.topics = db.topics.filter((t: string) => t !== topic);
      
      if (initialLength === db.topics.length) {
        return res.status(404).json({ message: 'Topic not found' });
      }
      
      this.saveDatabase(db);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting topic:', error);
      res.status(500).json({ message: 'Error deleting topic' });
    }
  }
}

export default TopicController;