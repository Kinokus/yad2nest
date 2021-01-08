import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type HoodDocument = Hood & Document


@Schema()
export class Hood {
  @Prop()
  name: string

  @Prop()
  id?: string

  @Prop()
  hoodId: string

  @Prop()
  cityId: string

  @Prop()
  areaId: string

  @Prop()
  topAreaId: string

  @Prop()
  _id?: string

}

export const HoodSchema = SchemaFactory.createForClass(Hood)
