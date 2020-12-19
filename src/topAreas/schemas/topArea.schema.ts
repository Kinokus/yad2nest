import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TopAreaDocument = TopArea & Document


@Schema()
export class TopArea {
  @Prop()
  name: string

  @Prop()
  topAreaId?: string

  @Prop()
  id?: string

  @Prop()
  _id?: string

}

export const TopAreaSchema = SchemaFactory.createForClass(TopArea)
