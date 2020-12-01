import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

export type SellerDocument = Seller & Document

@Schema()
export class Seller {
  @Prop()
  name: string

  @Prop()
  id: string

  @Prop()
  phones: [String]

  @Prop()
  isBroker : string


}

export const SellerSchema = SchemaFactory.createForClass(Seller)
