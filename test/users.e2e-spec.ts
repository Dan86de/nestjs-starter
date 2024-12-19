import { server } from './setup';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const request = require('supertest');

describe('UsersController (e2e)', () => {
  it('/users (GET)', () => {
    return request(server).get('/users').expect(401);
  });
});
