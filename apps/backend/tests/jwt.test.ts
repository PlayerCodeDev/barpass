import { config } from 'dotenv';
import { generateToken, verifyToken } from '../src/middlewares/jwt.middleware';
import express from 'express';
import request from 'supertest';

config();

async function runTest() {
  console.log('\n--- TEST 1: generar token ---');

  const token = generateToken({
    id: '12345',
    email: 'test@jwt.com',
    role: 'staff',
  });

  console.log('Token generado:', token);

  const app = express();

  app.get('/protected', verifyToken, (req, res) => {
    res.json({
      message: 'Acceso permitido.',
      user: req.user,
    });
  });

  console.log('\n--- TEST 2: verifyToken con token válido ---');
  const validResponse = await request(app)
    .get('/protected')
    .set('Authorization', `Bearer ${token}`);

  console.log('Respuesta con token válido:', validResponse.body);

  console.log('\n--- TEST 3: verifyToken con token inválido ---');
  const invalidResponse = await request(app)
    .get('/protected')
    .set('Authorization', 'Bearer token-invalido-123');

  console.log('Respuesta con token. inválido:', invalidResponse.body);

  console.log('\n--- TEST 4: verifyToken sin token ---');
  const noTokenResponse = await request(app).get('/protected');

  console.log('Respuesta sin token:', noTokenResponse.body);

  console.log('Fin de las pruebas JWT.');
}

runTest();
