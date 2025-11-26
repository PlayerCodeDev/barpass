import { Schema, model } from 'mongoose';

export type UserRole = 'admin' | 'staff';

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

export const UserModel = model<User>('User', userSchema);
