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
      name: 'Auth Test User',
      email: 'auth@test.com',
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

    console.log('\n--- Eliminando usuario de pruebas ---');
    await mongoose.connection.collection('user').deleteOne({
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
