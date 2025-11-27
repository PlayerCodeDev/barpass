import { Schema, model } from 'mongoose';

export type UserRole = 'admin' | 'staff';

/**
 * @property {string} name Nombre del usuario
 * @property {string} email Email único del usuario
 * @property {string} password Contraseña sin hashear (por ahora)
 * @property {'admin' | 'staff'} role Rol del usuario
 */
export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ['admin', 'staff'],
      required: true,
    },
  },
  { timestamps: true },
);

/**
 * Modelo de Usuarios para MongoDB.
 * Permite crear, consultar y manipular usuarios.
 */
export const UserModel = model<User>('User', userSchema);
