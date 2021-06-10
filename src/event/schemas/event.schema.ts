import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {

  @Prop({ required: true, type: Object })
  person: object;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  begin: string;

  @Prop({ required: true })
  end: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  rappel: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);