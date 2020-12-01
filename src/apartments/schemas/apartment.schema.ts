import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ApartmentDocument = Apartment & Document

@Schema()
export class Apartment {
  // todo: maybe address will be separated street/house/apartment etc...
  @Prop()
  address: string

  @Prop()
  id: string

  @Prop()
  cityId: string

  @Prop()
  areaId: string

  @Prop()
  sellerId: string



}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment)
