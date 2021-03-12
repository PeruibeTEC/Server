import app from '@shared/infra/http/config/app';

import request from 'supertest';

describe('Body Parser Middleware', () => {
  it('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Rodrigo' })
      .expect({ name: 'Rodrigo' });
  });
});
