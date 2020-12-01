import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCityDto } from '../cities/dto/create-city.dto';
import { City } from '../cities/schemas/city.schema';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { Apartment, ApartmentDocument } from './schemas/apartment.schema';

@Injectable()
export class ApartmentsService {
  constructor(@InjectModel(Apartment.name) private apartmentModel: Model<ApartmentDocument>) {
  }

  getAll(): Promise<Apartment[]> {
    return this.apartmentModel.find().exec();
  }

  create(createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    const newApartment = new this.apartmentModel(createApartmentDto);
    return newApartment.save();
  }


  getOne(id: string): Promise<Apartment> {
    return this.apartmentModel.findById(id).exec();
  }



  async remove(id: string): Promise<Apartment> {
    return this.apartmentModel.findByIdAndRemove(id);
  }

  async update(id: string, updateApartmentDto: UpdateApartmentDto) {
    return this.apartmentModel.findByIdAndUpdate(id, updateApartmentDto, { upsert: true, useFindAndModify: false });
  }
}
