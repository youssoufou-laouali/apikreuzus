import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema'
import { PaginationDto } from "./dto/pagination-event.dto";

@Injectable()
export class EventService {

  constructor(@InjectModel('event') private readonly model: Model<EventDocument>){}


   async create(createEventDto: CreateEventDto) {
    const newEvent = await new this.model({
      ...createEventDto
    })
    
    return newEvent.save()
    
  }

  async findAll(pagination: PaginationDto): Promise<Event[]>  {
    const { limit, offset } = pagination
    return await this.model.find()
                  .skip(offset) 
                  .limit(limit)
                  .exec();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.model
      .findById({ _id: id })
      .exec();

    if (!event) {
      throw new NotFoundException(`Erreur: l'id ${id} est introuvable`);
    }

    return event;
    
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event>{
    const eventToUpdate = await this.model.findByIdAndUpdate(
      { _id: id },
      updateEventDto,
    );

    if (!eventToUpdate) {
      throw new NotFoundException(`Erreur: l'id ${id} est introuvable`);
    }

    return eventToUpdate;
  }

  async remove(id: string): Promise<Event> {
    const deletedEvent = await this.model.findByIdAndRemove(id);

    return deletedEvent;
  }
   
}
