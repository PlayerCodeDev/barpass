import mongoose from 'mongoose';
import { UserService } from '../src/services/user.service';
import { config } from 'dotenv';
import { UserModel, User } from '../src/models/user.model.js';

// cargar variables de entorno.
config();

async function runTests() {
  try {
    console.log('Conectando a MongoDB...');
    const URI = process.env.MONGO_URI;
    if (!URI) {
      throw new Error('La variable de entorno MONGO_URI no está definida.');
    }
    await mongoose.connect(URI);
    console.log('Conectando.');

    // Datos de prueba
    const testUser: User = {
      name: 'Test User',
      email: 'test@example.com',
      password: '12345678',
      role: 'staff',
    };

    console.log('\n--- TEST: Crear usuario ---');
    const newUser = await UserService.createUser(testUser);
    console.log('Usuario creado:', newUser);

    console.log('\n--- TEST: Buscar usuario por emeail ---');
    const foundUser = await UserService.findByEmail(testUser.email);
    console.log('Usuario encontrado:', foundUser);
    console.log('\n Eliminando usuario de pruebas.');
    await UserModel.deleteOne({ email: testUser.email });
  } catch (err) {
    console.error('Error durante los test:', err);
  } finally {
    await mongoose.disconnect();
    console.log('\n Conexión cerrada. Test finalizado.');
  }
}

runTests();
