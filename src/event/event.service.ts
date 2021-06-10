import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {list} from './data'

@Injectable()
export class EventService {

  constructor(){   
  }

  List=list

  create(createEventDto: CreateEventDto) {
    this.List= [...this.List, createEventDto]
    return {
      success: true,
      event: 'Element ajouté avec succés'
    };
  }

  findAll(): any[] {
    return this.List;
  }

  findOne(id: number): {} {
    
    let x = this.List.find(el=> el.id==id)
    
    if(!x){
      return new NotFoundException(`Aucun element ne correspond à l'identifiant ${id}`)
    }
    return {
      success: true,
      event: x
    }
  }

  update(id: number, updateEventDto: UpdateEventDto): {} {
    let x = this.List.find(el=> el.id==id)
    let i = this.List.findIndex(el=> el.id==id)
    
    this.List[i]={...this.List[i], ...updateEventDto}
    if(!x){
      return new NotFoundException(`Aucun element ne correspond à l'identifiant ${id}`)
    }
    return {
      success: true,
      event: 'l\'élement '+ id+ ' à été modifié avec succés'
    }
  }

  remove(id: number):{} {
    let x = this.List.find(el=> el.id==id)
    let i = this.List.findIndex(el=> el.id==id)
    
    this.List.splice(i, 1)
    if(!x){
      return new NotFoundException(`Aucun element ne correspond à l'identifiant ${id}`)
    }
    return {
        success: true,
        event: `Evenement ${id} est supprimé avec succes`
      }
    
  }
}
