import { EventModel, Event } from '../models/event.model.js';

export class EventService {
  /**
   * Crea un evento en la base de datos.
   *
   * @param data Datos del evento a crear (desciption es opcional)
   * @param creatorRole Rol del usuario que intenta crear el evento
   * @param creatorId ID del usuario que intenta crear el evento
   * @returns El evento creado
   */
  static async createEvent(
    data: Omit<Event, 'createdBy'>,
    creatorRole: 'admin' | 'staff',
    creatorId: string,
  ) {
    // Validación de rol
    if (creatorRole !== 'admin') {
      throw new Error('Solo un administrador puede crear eventos.');
    }
    // Validación de fechas
    if (data.startDate > data.endDate) {
      throw new Error('La fecha de inicio no puede ser mayor que la fecha de término.');
    }

    return EventModel.create({
      ...data,
      createdBy: creatorId,
    });
  }

  /**
   * Obtiene todos los eventos creados por un admin.
   *
   * @param adminId ID del administrador dueño de los eventos
   * @return Lista de eventos creados
   */
  static async getEventsByAdmin(adminId: string) {
    return EventModel.find({ createdBy: adminId }).exec();
  }
}
