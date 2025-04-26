import * as supertest from 'supertest';

import app from '../src/app';

const request = supertest('https://jsonplxaceholder.typicode.com');

describe('API Endpoints', () => {
  it('should get all speakers', async () => {
    const response = await request(app).get('/api/speakers');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a speaker by ID', async () => {
    const response = await request(app).get('/api/speakers/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('should create a new speaker', async () => {
    const newSpeaker = { name: 'John Doe', topic: 'Technology' };
    const response = await request(app).post('/api/speakers').send(newSpeaker);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', newSpeaker.name);
  });

  it('should update an existing speaker', async () => {
    const updatedSpeaker = { name: 'Jane Doe', topic: 'Science' };
    const response = await request(app).put('/api/speakers/1').send(updatedSpeaker);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', updatedSpeaker.name);
  });

  it('should delete a speaker', async () => {
    const response = await request(app).delete('/api/speakers/1');
    expect(response.status).toBe(204);
  });
});
