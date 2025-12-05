import mongoose from 'mongoose';
import { config } from 'dotenv';
import request from 'supertest';
import app from '../src/app.js';
import { UserService } from '../src/services/user.service.js';
import { UserModel } from '../src/models/user.model.js';
import { EventModel } from '../src/models/event.model.js';

config();

async function runTests() {
  try {
    console.log('Conectando a MongoDB...');
    const URI = process.env.MONGO_URI;

    if (!URI) throw new Error('La variable de entorno MONGO_URI no está definida.');

    await mongoose.connect(URI);
    console.log('Conexión establecida.');

    // Crear y listar eventos con usuario admin

    const adminUser = await UserService.createUser({
      name: 'Admin Test',
      email: 'adminEvent@test.com',
      password: '12345678',
      role: 'admin',
    });

    console.log('\n--- TEST: Login ADMIN ---');
    const loginAdmin = await request(app)
      .post('/api/auth/login')
      .send({ email: adminUser.email, password: '12345678' });

    console.log(loginAdmin.body);

    const adminToken = loginAdmin.body.token;
    console.log('Token admin:', adminToken ? 'OK' : 'FALLÓ');

    console.log('\n--- TEST: Crear evento (admin) ---');
    const createRes = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        nameEvent: 'Evento de pruebas',
        descriptionEvent: 'Descripción opcional',
        startDateEvent: new Date(),
        endDateEvent: new Date(Date.now() + 3600000),
      });

    console.log('Respuesta POST /events:', createRes.body);

    console.log('\n--- TEST: GET /events ---');
    const listRes = await request(app)
      .get('/api/events')
      .set('Authorization', `Bearer ${adminToken}`);
    console.log('Respuesta GET /events:', listRes.body);

    // Crear evento con usuario staff

    const staffUser = await UserService.createUser({
      name: 'Staff Test',
      email: 'staff-events@test.com',
      password: '12345678',
      role: 'staff',
    });

    const loginStaff = await request(app)
      .post('/api/auth/login')
      .send({ email: staffUser.email, password: '12345678' });

    const staffToken = loginStaff.body.token;

    console.log('\n--- TEST: Crear evento (staff - debe fallar) ---');
    const createFail = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        nameEvent: 'Evento no permitido',
        descriptionEvent: 'Staff no debe crear',
        startDateEvent: new Date(),
        endDateEvent: new Date(Date.now() + 3600000),
      });

    console.log('Respuesta staff:', createFail.body);

    // Limpiar datos

    console.log('\n--- Eliminando datos de prueba ---');
    await EventModel.deleteMany({});
    await UserModel.deleteMany({
      email: { $in: [adminUser.email, staffUser.email] },
    });
  } catch (err) {
    console.log('Error durante pruebas:', err);
  } finally {
    await mongoose.disconnect();
    console.log('\nConexión cerrada. Test finalizado.');
  }
}

runTests();
