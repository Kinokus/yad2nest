import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { Apartment, ApartmentDocument } from './schemas/apartment.schema';
// import { CitiesService } from '../cities/cities.service';
import { CitiesService } from '../cities/cities.service';
import { AreasService } from '../areas/areas.service';


@Injectable()
export class ApartmentsService {
  constructor(
    @InjectModel(Apartment.name) private apartmentModel: Model<ApartmentDocument>,
    private citiesService: CitiesService,
    private areasService: AreasService,
  ) {
  }

  getAll(): Promise<Apartment[]> {
    return this.apartmentModel.find().exec();
  }

  create(createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    // const newApartment = new this.apartmentModel(createApartmentDto);
    // console.log(createApartmentDto);



    return this.apartmentModel
      .findOneAndUpdate(
        {
          apartmentId: createApartmentDto.apartmentId,
        },
        createApartmentDto,
        {
          upsert: true,
          useFindAndModify: false,
        },
      )
      .exec();
    // return newApartment.save();
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

  async getNewIds(apartmentIds: string[]) {
    const apartmentIdFound = await this.apartmentModel
      .find({apartmentId: {$in: apartmentIds}})
      .distinct('apartmentId')
      .lean()

    const apartmentIdsFiltered = apartmentIds.filter((ai: any) => {
      return (apartmentIdFound.indexOf(ai) === -1);
    })

    console.log(apartmentIdsFiltered);

    return apartmentIdsFiltered


  }
}
