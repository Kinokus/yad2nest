import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApartmentDocument = Apartment & Document

@Schema()
export class Apartment {
  // todo: maybe address will be separated street/house/apartment etc...
  @Prop() name: string;
  @Prop() address: string;
  @Prop() id: string;
  @Prop() cityId: string;
  @Prop() areaId: string;
  @Prop() sellerId: string;
  @Prop() airConditioner: boolean = null;
  @Prop() arnona: number = -2;
  @Prop() forPartners: boolean = null;
  @Prop() kosherKitchen: boolean = null;
  @Prop() elevator: boolean = null;
  @Prop() accessibility: boolean = null;
  @Prop() warhouse: boolean = null;
  @Prop() pandorDoors: boolean = null;
  @Prop() tadiranC: boolean = null;
  @Prop() viaMakler: boolean = null;
  @Prop() updated: string = '';
  @Prop() about: string = '';
  @Prop() apartmentId: string = '';
  @Prop() summary: string = '';
  @Prop() cityArea: string = '';
  @Prop() city: string = '';
  @Prop() area: string = '';
  @Prop() rooms: number = -2;
  @Prop() balconies: number = -2;
  @Prop() floor: number = -2;
  @Prop() meters: number = -2;
  @Prop() price: number = -2;
  @Prop() description: string = '';
  @Prop({type: String, required: false}) dateOfEntrance;
  @Prop() sellerName: string = '';
  @Prop() sellerPhone1: string = '';
  @Prop() sellerPhone2: string = '';
  @Prop() images: string[] = [];
  @Prop() conditioning: boolean = false;
  @Prop() elevators: boolean = false;
  @Prop() renovated: boolean = false;
  @Prop() pandoraDoors: boolean = false;
  @Prop() tadiran: boolean = false;
  @Prop() longTerm: boolean = false;
  @Prop() bars: boolean = false;
  @Prop() accessForDisabled: boolean = false;
  @Prop() shelter: boolean = false;
  @Prop() storage: boolean = false;
  @Prop() pets: boolean = false;
  @Prop() furniture: boolean = false;
  @Prop({type: String, required: false}) entryDate;
  @Prop() houseCommittee: number = -2;
  @Prop() totalFloors: number = -2;
  @Prop() numberPayments: number = -2;
  @Prop() parking: number = -2;
  @Prop() levelQuietOnStreet: number = -2;
  @Prop() streetParking: number = -2;
  @Prop() proximityCommercialServices: number = -2;
  @Prop() accessibilityPublicTransportation: number = -2;
  @Prop() exclusiveProperty: boolean = false;
  @Prop() propertyCondition: string = '';
  // 'id':''
  @Prop() title: string = '';
  @Prop() message: string = '';
  @Prop() video: string = '';
  @Prop() entrance: string = '';


}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
