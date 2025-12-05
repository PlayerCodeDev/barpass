import mongoose from 'mongoose';
import { config } from 'dotenv';
import { EventService } from '../src/services/event.service';
import { UserService } from '../src/services/user.service';
import { User } from '../src/models/user.model';

config();

async function runTests() {
  try {
    console.log('Conectando a MongoDB...');
    const URI = process.env.MONGO_URI;

    if (!URI) {
      throw new Error('La variable de entorno MONGO_URI no está definida.');
    }

    await mongoose.connect(URI);
    console.log('Conexión establecida.');

    const adminUser: User = {
      name: 'Admin Test',
      email: 'adminEvent@test.com',
      password: '12345678',
      role: 'admin',
    };

    console.log('\n--- TEST: Crear admin de pruebas ---');
    const createdAdmin = await UserService.createUser(adminUser);
    console.log('Admin creado:', createdAdmin);

    console.log('\n--- TEST: Crear evento ---');
    const newEvent = await EventService.createEvent(
      {
        name: 'Evento de prueba',
        description: 'Descripción opcional del evento.',
        startDate: new Date(),
        endDate: new Date(Date.now() + 3600000),
      },
      adminUser.role,
      createdAdmin._id.toString(),
    );

    console.log('Evento creado:', newEvent);

    console.log('\n--- TEST: Listar eventos de admin ---');
    const events = await EventService.getEventsByAdmin(createdAdmin._id.toString());
    console.log('Eventos obtenidos:', events);

    console.log('\n--- Eliminando datos de prueba ---');
    await mongoose.connection.collection('events').deleteMany({
      name: newEvent.name,
    });
    await mongoose.connection.collection('users').deleteOne({
      email: adminUser.email,
    });
  } catch (err) {
    console.error('Error durante las pruebas:', err);
  } finally {
    await mongoose.disconnect();
    console.log('\nConexión cerrada. Test finalizado.');
  }
}

runTests();
