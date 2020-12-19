import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CityDocument = City & Document


@Schema()
export class City {
  @Prop()
  name: string

  @Prop()
  cityId: string

  @Prop()
  areaId: string

  @Prop()
  topAreaId: string

  @Prop()
  id?: string

  @Prop()
  _id?: string

}

export const CitySchema = SchemaFactory.createForClass(City)
