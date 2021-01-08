import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Coordinates } from './coordinates';

export type ApartmentDocument = Apartment & Document

@Schema()
export class Apartment {
  // todo: maybe address will be separated street/house/apartment etc...
  @Prop() name: string;
  @Prop() street: string;
  @Prop() homeNumber: string;
  @Prop() id: string;

  @Prop() topAreaId: string;
  @Prop() areaId: string;
  @Prop() cityId: string;
  @Prop() hoodId: string;

  @Prop() topArea: string;
  // @Prop() area: string;
  // @Prop() city: string;
  @Prop() hood: string;

  @Prop() airConditioner: boolean = null;
  @Prop() airConditionerTadiran: boolean = null;

  @Prop() arnona: number = null;
  @Prop() forPartners: boolean = null;
  @Prop() kosherKitchen: boolean = null;
  @Prop() elevator: boolean = null;
  @Prop() accessibility: boolean = null;
  @Prop() warhouse: boolean = null;
  @Prop() pandorDoors: boolean = null;
  @Prop() tadiranC: boolean = null;
  @Prop() viaMakler: boolean = null;
  @Prop() updated: Date = null;
  @Prop() about: string = '';
  @Prop() apartmentId: string = '';
  @Prop() summary: string = '';
  @Prop() cityArea: string = '';
  @Prop() city: string = '';
  @Prop() area: string = '';
  @Prop() rooms: number = null;
  @Prop() balconies: number = null;
  @Prop() floor: number = null;
  @Prop() meters: number = null;
  @Prop() price: number = null;
  @Prop() description: string = '';
  @Prop({ type: String, required: false }) dateOfEntrance;
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
  @Prop({ type: Date, required: false }) entryDate;
  @Prop() houseCommittee: number = null;
  @Prop() totalFloors: number = null;
  @Prop() numberPayments: number = null;
  @Prop() parking: boolean = null;
  @Prop() levelQuietOnStreet: number = null;
  @Prop() streetParking: number = null;
  @Prop() proximityCommercialServices: number = null;
  @Prop() accessibilityPublicTransportation: number = null;
  @Prop() exclusiveProperty: boolean = false;
  @Prop() propertyCondition: string = '';
  // 'id':''
  @Prop() title: string = '';
  @Prop() message: string = '';
  @Prop() video: string = '';
  @Prop() entrance: string = '';
  @Prop({ type: Coordinates }) coordinates = null;

  @Prop() sellerId: string;
  // @Prop() entrance: string = '';
  @Prop() urgentEntrance: boolean;
  @Prop() added: Date;
  @Prop() mamad: boolean;
  @Prop() sunpatio: boolean;
  @Prop() columns: boolean;
  @Prop() storeroom: boolean;
  @Prop() communal: boolean;
  @Prop() patio: boolean;


}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
