import request from 'supertest';
import { App } from '../framework/app';

const makeSut = () => {
  const appInstance = new App();
  const { app } = appInstance;
  return { app };
};

describe('Content-Type Middleware', () => {
  it('Should return default content-type as json', async () => {
    const { app } = makeSut();
    app.get('/test_content_type', (req, res) => {
      res.send('');
    });
    await request(app).get('/test_content_type').expect('content-type', /json/);
    // passa uma regex para verificar se o content-type é json pela forma de escrita ex: application/json
  });

  it('Should return xml content-type when forced', async () => {
    const { app } = makeSut();
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml');
      res.send('');
    });
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/);
  });
});
