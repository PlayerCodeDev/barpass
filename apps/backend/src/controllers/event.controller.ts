import { Request, Response } from 'express';
import { EventService } from '../services/event.service';

/**
 * Controlador para gestión de eventos.
 */
export class EventController {
  static async create(req: Request, res: Response) {
    try {
      const user = req.user as { id: string; role: 'admin' | 'staff' };

      if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Solo un administrador puede crear eventos.' });
      }

      const { nameEvent, descriptionEvent, startDateEvent, endDateEvent } = req.body;

      if (!nameEvent || !startDateEvent || !endDateEvent) {
        return res.status(400).json({
          error: 'nombre, fecha de inicio y fecha de termino son obligatorios.',
        });
      }

      const newEvent = await EventService.createEvent(
        {
          name: nameEvent,
          description: descriptionEvent,
          startDate: startDateEvent,
          endDate: endDateEvent,
        },
        user.role,
        user.id,
      );

      return res.status(201).json({
        message: 'Evento creado con éxito',
        event: newEvent,
      });
    } catch (err) {
      console.error('Error en la creación de evento:', err);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  /**
   * Obtener eventos creados por el administrador autenticado.
   */
  static async list(req: Request, res: Response) {
    try {
      const user = req.user as { id: string; role: string };

      if (user.role !== 'admin') {
        return res.status(403).json({ error: 'Solo un admin puede ver sus eventos.' });
      }

      const events = await EventService.getEventsByAdmin(user.id);

      return res.status(200).json({
        message: 'Eventos obtenidos con éxito',
        events,
      });
    } catch (err) {
      console.error('Error al obtener eventos:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}
