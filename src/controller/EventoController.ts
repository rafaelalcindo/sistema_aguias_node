import { Request } from "express";
import { getCustomRepository } from "typeorm";
import Evento from "../models/Evento";
import EventoRepository from "../repository/EventoRepository";
import { IEventos } from "../types/formInterfaces";

class EventoController {
    public async indexEvento(request: Request) {
        const eventoRepository = getCustomRepository(EventoRepository);
        return eventoRepository.indexEvento(request.query);
    }

    public async createEvento(eventoRequest: IEventos): Promise<Evento> {
        const eventoRepository = getCustomRepository(EventoRepository);
        return eventoRepository.createEvento(eventoRequest);
    }

    public async getEvento(EventoId: number): Promise<Evento> {
        const eventoRepository = getCustomRepository(EventoRepository);
        return eventoRepository.getEvento(EventoId);
    }

    public async updateEvento(eventoId: number, eventoRequest: IEventos): Promise<any> {
        const eventoRepository = getCustomRepository(EventoRepository);
        return eventoRepository.updateEvento(eventoId, eventoRequest);
    }

    public async deleteEvento(eventoId: number): Promise<any> {
        const eventoRepository = getCustomRepository(EventoRepository);
        return eventoRepository.deleteEvento(eventoId);
    }

}

export default EventoController;