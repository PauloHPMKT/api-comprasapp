import request from 'supertest';
import { App } from '../framework/app';

const makeSut = () => {
  const appInstance = new App();
  const { app } = appInstance;
  return { app };
};

describe('BodyParser Middleware', () => {
  it('Should parser body as json format', async () => {
    const { app } = makeSut();
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' });
  });
});
