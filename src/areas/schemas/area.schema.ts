import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AreaDocument = Area & Document

@Schema()
export class Area {
  @Prop()
  name: string

  @Prop()
  id?: string
  @Prop()
  _id?: string

  @Prop()
  cityId?: string

}

export const AreaSchema = SchemaFactory.createForClass(Area)
