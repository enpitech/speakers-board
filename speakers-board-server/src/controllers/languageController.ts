import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

class LanguageController {
  private dbPath = path.join(__dirname, '../../../db/db.json');

  private getDatabase() {
    const data = fs.readFileSync(this.dbPath, 'utf8');
    return JSON.parse(data);
  }

  private saveDatabase(data: any) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
  }

  getAllLanguages(req: Request, res: Response) {
    try {
      const db = this.getDatabase();
      res.json(db.languages || []);
    } catch (error) {
      console.error('Error getting languages:', error);
      res.status(500).json({ message: 'Error fetching languages' });
    }
  }

  addLanguage(req: Request, res: Response) {
    try {
      const { language } = req.body;
      if (!language) {
        return res.status(400).json({ message: 'Language is required' });
      }

      const db = this.getDatabase();
      
      if (!db.languages) {
        db.languages = [];
      }
      
      // Check if language already exists
      if (db.languages.includes(language)) {
        return res.status(409).json({ message: 'Language already exists' });
      }
      
      db.languages.push(language);
      this.saveDatabase(db);
      
      res.status(201).json({ language });
    } catch (error) {
      console.error('Error adding language:', error);
      res.status(500).json({ message: 'Error adding language' });
    }
  }

  deleteLanguage(req: Request, res: Response) {
    try {
      const { language } = req.params;
      const db = this.getDatabase();
      
      if (!db.languages) {
        return res.status(404).json({ message: 'No languages found' });
      }
      
      const initialLength = db.languages.length;
      db.languages = db.languages.filter((lang: string) => lang !== language);
      
      if (initialLength === db.languages.length) {
        return res.status(404).json({ message: 'Language not found' });
      }
      
      this.saveDatabase(db);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting language:', error);
      res.status(500).json({ message: 'Error deleting language' });
    }
  }
}

export default LanguageController;