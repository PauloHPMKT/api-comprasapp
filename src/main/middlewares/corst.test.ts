import request from 'supertest';
import { App } from '../framework/app';

const makeSut = () => {
  const appInstance = new App();
  const { app } = appInstance;
  return { app };
};

describe('Cors Middleware', () => {
  it('Shpuld enable cors', async () => {
    const { app } = makeSut();
    app.get('/test_cors', (req, res) => {
      res.send();
    });
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*');
  });
});
