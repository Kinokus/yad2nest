import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { Apartment, ApartmentDocument } from './schemas/apartment.schema';

import { CitiesService } from '../cities/cities.service';
import { AreasService } from '../areas/areas.service';
import { SellersService } from '../sellers/sellers.service';


@Injectable()
export class ApartmentsService {
  constructor(
    @InjectModel(Apartment.name) private apartmentModel: Model<ApartmentDocument>,
    private citiesService: CitiesService,
    private areasService: AreasService,
    private sellersService: SellersService,
  ) {
  }

  getAll(): Promise<Apartment[]> {
    return this.apartmentModel.find().exec();
  }

  async create(createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    const newCity = await this.citiesService.create({ name: createApartmentDto.city });


    const sellerPayload = {
      name: createApartmentDto.sellerName,
      phone1: createApartmentDto.sellerPhone1,
      phone2: createApartmentDto.sellerPhone2,
      isBroker: createApartmentDto.viaMakler,
    }
    const newSeller = await this.sellersService.create(sellerPayload);

    const newArea = await this.areasService.create({
      name: createApartmentDto.area,
      cityId: newCity._id,
    });

    if (!newArea || !newCity || !newSeller) {
      console.error('\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

      console.error('\nnewArea');
      console.error(newArea);

      console.error('\nnewCity');
      console.error(newCity);

      console.error('\nnewSeller');
      console.error(sellerPayload);
      console.error(newSeller);
      console.error('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      return;
    }

    createApartmentDto.cityId = newCity._id;
    createApartmentDto.areaId = newArea._id;
    createApartmentDto.sellerId = newSeller._id;

    return this.apartmentModel
      .findOneAndUpdate(
        {
          apartmentId: createApartmentDto.apartmentId,
          cityId: createApartmentDto.cityId,
          areaId: createApartmentDto.areaId,
          sellerId: createApartmentDto.sellerId,
        },
        createApartmentDto,
        {
          upsert: true,
          useFindAndModify: false,
          new: true
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
      .find({ apartmentId: { $in: apartmentIds } })
      .distinct('apartmentId')
      .lean();

    const apartmentIdsFiltered = apartmentIds.filter((ai: any) => {
      return (apartmentIdFound.indexOf(ai) === -1);
    });

    // console.log(apartmentIdsFiltered);

    return apartmentIdsFiltered;


  }
}
