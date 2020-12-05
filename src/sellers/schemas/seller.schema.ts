import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SellerDocument = Seller & Document

@Schema()
export class Seller {
  @Prop({ required: true }) name?: string;
  @Prop({ required: false }) id?: string;
  @Prop({ required: false }) _id?: string;
  @Prop({ required: true }) phone1?: string;
  @Prop({ required: false }) phone2?: string;
  @Prop({ required: false }) isBroker?: boolean;


}

export const SellerSchema = SchemaFactory.createForClass(Seller);
