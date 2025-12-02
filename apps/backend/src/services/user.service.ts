import { UserModel, User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export class UserService {
  /**
   * Crea un nuevo usuario en la base de datos.
   *
   * Revibe un objeto `User` y lo persiste tal cual en la colección.
   * No realiza validaciones adicionales ni hashing de contraseña.
   *
   * @async
   * @param data - Datos del usuario: { name, email, password, role }.
   * @returns El documento creado en MongoDB.
   */
  static async createUser(data: User) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const userData = {
      ...data,
      password: hashedPassword,
    };

    const user = await UserModel.create(userData);
    return user;
  }

  /**
   * Busca un usuario por su email.
   *
   * @async
   * @param email - Email del usuario a buscar.
   * @returns El usuario encontrado o `null` si no existe.
   */
  static async findByEmail(email: string) {
    return UserModel.findOne({ email }).exec();
  }
}
