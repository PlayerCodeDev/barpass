import mongoose from 'mongoose';
import { config } from 'dotenv';
import app from '../src/app.js';
import request from 'supertest';
import { UserService } from '../src/services/user.service.js';
import { User } from '../src/models/user.model.js';

config();

async function runTests() {
  try {
    console.log('Conectando a MongoDB...');
    const URI = process.env.MONGO_URI;

    if (!URI) {
      throw new Error('La variable de entorno MONGO_URI no está definida.');
    }

    await mongoose.connect(URI);
    console.log('Conexión establedica.');

    const testUser: User = {
      name: 'AuthMe Test User',
      email: 'authme@test.com',
      password: '12345678',
      role: 'staff',
    };

    console.log('\n--- TEST: Crear usuario ---');
    const newUser = await UserService.createUser(testUser);
    console.log('Usuario creado:', newUser);

    console.log('\n--- TEST: Login ---');
    const loginRes = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    console.log('Respuesta login:', loginRes.body);

    const token = loginRes.body.token;

    if (!token) {
      throw new Error('No se recibió token en la respuesta del login.');
    }

    console.log('\n--- TEST: GET /auth/me ---');
    const meRes = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);

    console.log('Respuesta /auth/me:', meRes.body);

    console.log('\n--- Eliminando usuario de pruebas ---');
    await mongoose.connection.collection('users').deleteOne({
      email: testUser.email,
    });
  } catch (err) {
    console.error('Error durante las pruebas:', err);
  } finally {
    await mongoose.disconnect();
    console.log('\nConexión cerrada. Test finalizado.');
  }
}

runTests();
