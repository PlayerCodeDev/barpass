import { UserModel, User } from '../models/user.model.js';

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
    const user = await UserModel.create(data);
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
