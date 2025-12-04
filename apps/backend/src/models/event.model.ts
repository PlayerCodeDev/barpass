import { Schema, model } from 'mongoose';

/**
 * Representa un evento creado por un usuario administrador.
 *
 * @property {string} name Nombre del evento (obligatorio)
 * @property {string} description Descripción opcional del evento
 * @property {Date} startDate Fecha/hora de inicio del evento
 * @property {Date} endDate Fecha/hora de término del evento
 * @property {string} createdBy ID del admin que creó el evento
 */
export interface Event {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  createdBy: string;
}

const eventSchema = new Schema<Event>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const EventModel = model<Event>('Event', eventSchema);
