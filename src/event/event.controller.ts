import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';


@Controller('v1/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll(@Res() res) {
    const data= await this.eventService.findAll();
    
    return res.status(200).json({
      success: true,
      message: `Requête effectué avec succés`,
      response: {
        status: 200,
        data,
      },
      
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res) {
    const data = await this.eventService.findOne(id);

    if(!data){
      throw new NotFoundException(`Erreur: l'id ${id} est introuvable`);
    }

    return res.status(200).json({
      success: true,
      message: `Requête effectué avec succés`,
      response: {
        status: 200,
        data
      },
      
    })
  }
  
  @Post()
  @HttpCode(201)
  async create(@Res() res ,@Body() createEventDto: CreateEventDto) {
    try {
      const data= await this.eventService.create(createEventDto);
      return res.json({
        success: true,
        message: `l'évenement est ajouté avec succés`,
        response: {
          status: 201,
          id: data.id,
          add: 1
        }
      })
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erreur: l'évenement n'est pas creér",
        status: 400,
        model:{
          id: "*Number",
          title: "*String",
          begin: "Date",
          end: "Date",
          description: "String",
          rappel: "String Select(aucun, mail, sms)",
          person:{
            name: "*String",
            lastName: "*String",
            email: "*String Email",
          },
        }
      })
    }
    
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto, @Res() res) {
    
    try {
      const data= await this.eventService.update(id, updateEventDto);
      if(!data){
        throw new NotFoundException(`Erreur: l'id ${id} est introuvable`);
      }

      return res.status(200).json({
        success: true,
        message: `la mis à jour est effectué avec succés`,
        response: {
          status: 200,
          id: data.id,
          edit: 1
        }
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur: l'id ${id} est introuvable`,
        status: 400,
        model:{
          title: "String",
          begin: "Date",
          end: "Date",
          description: "String",
          rappel: "String Select(aucun, mail, sms)",
        }
      })
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res) {

    try {
      const data= await this.eventService.remove(id);
      if(!data){
        throw new NotFoundException(`Erreur: l'id ${id} est introuvable`);
      }

      return res.status(200).json({
        success: true,
        message: `l'evenement est supprimé avec succés`,
        response: {
          status: 200,
          id,
          delete: 1
        }
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: `Erreur: Aucun élement correspond à ${id}`,
        status: 400,
        id
      })
    
    }
    
  }
}
