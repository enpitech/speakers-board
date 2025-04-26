import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Session } from '../types';

class SessionController {
  private dbPath = path.join(__dirname, '../../../db/db.json');

  private getDatabase() {
    const data = fs.readFileSync(this.dbPath, 'utf8');
    return JSON.parse(data);
  }

  private saveDatabase(data: any) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
  }

  getAllSessions(req: Request, res: Response) {
    try {
      const db = this.getDatabase();
      res.json(db.sessions || []);
    } catch (error) {
      console.error('Error getting sessions:', error);
      res.status(500).json({ message: 'Error fetching sessions' });
    }
  }

  getSessionById(req: Request, res: Response) {
    try {
      const sessionId = req.params.id;
      const db = this.getDatabase();
      const session = db.sessions?.find((session: Session) => session.id === sessionId);
      
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      
      res.json(session);
    } catch (error) {
      console.error('Error getting session by ID:', error);
      res.status(500).json({ message: 'Error fetching session' });
    }
  }

  createSession(req: Request, res: Response) {
    try {
      const db = this.getDatabase();
      const newSession: Session = {
        id: uuidv4(),
        ...req.body
      };

      if (!db.sessions) {
        db.sessions = [];
      }
      
      db.sessions.push(newSession);
      this.saveDatabase(db);
      
      res.status(201).json(newSession);
    } catch (error) {
      console.error('Error creating session:', error);
      res.status(500).json({ message: 'Error creating session' });
    }
  }

  updateSession(req: Request, res: Response) {
    try {
      const sessionId = req.params.id;
      const db = this.getDatabase();
      
      const sessionIndex = db.sessions.findIndex((session: Session) => session.id === sessionId);
      
      if (sessionIndex === -1) {
        return res.status(404).json({ message: 'Session not found' });
      }
      
      db.sessions[sessionIndex] = {
        ...db.sessions[sessionIndex],
        ...req.body,
        id: sessionId // Ensure ID doesn't change
      };
      
      this.saveDatabase(db);
      res.json(db.sessions[sessionIndex]);
    } catch (error) {
      console.error('Error updating session:', error);
      res.status(500).json({ message: 'Error updating session' });
    }
  }

  deleteSession(req: Request, res: Response) {
    try {
      const sessionId = req.params.id;
      const db = this.getDatabase();
      
      const sessionIndex = db.sessions.findIndex((session: Session) => session.id === sessionId);
      
      if (sessionIndex === -1) {
        return res.status(404).json({ message: 'Session not found' });
      }
      
      db.sessions.splice(sessionIndex, 1);
      this.saveDatabase(db);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting session:', error);
      res.status(500).json({ message: 'Error deleting session' });
    }
  }
}

export default SessionController;