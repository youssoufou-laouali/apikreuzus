import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode, Res, Query, NotFoundException, HttpStatus } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto } from './dto/pagination-event.dto';

@Controller('v1/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll(@Res() res, @Query() pagination: PaginationDto ) {
    const events= await this.eventService.findAll(pagination);
    return res.status(200).json({success: true, events})
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    const event = await this.eventService.findOne(id);
    if(!event){
      throw new NotFoundException(`Erreur: l'id ${id} est introuvable`);
    }
    return res.status(HttpStatus.OK).json(event)
  }
  
  @Post()
  @HttpCode(201)
  async create(@Res() res, @Body() createEventDto: CreateEventDto) {
     try {
       const event = await this.eventService.create(createEventDto);
       return res.status(HttpStatus.OK).json({
         message: 'un évenement vient d\'être ajouter',
         event
       })
     } catch (err) {
       return res.status(HttpStatus.BAD_REQUEST).json({
         message: "Erreur: l'évenement n'est pas creér",
         status: 400
       })
     }
  }

  @Patch(':id')
  async update(@Res() res, @Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    try {
      const event = await this.eventService.update(id, updateEventDto);
      if(!event){
        throw new NotFoundException(`Erreur: l'id ${id} est introuvable`);
      }

      return res.status(HttpStatus.OK).json({
        message: 'un évenement vient d\'être mis à jour',
        event
      })
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erreur: l'évenement n'est pas mis à jour",
        status: 400
      })
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    const event = await this.eventService.remove(id);
    if(!event){
      throw new NotFoundException(`Erreur: l'id ${id} est introuvable`);
    }
    return res.status(HttpStatus.OK).json({
      message: 'l\'évenement est supprimé avec succés',
      event
    })
  }
}
