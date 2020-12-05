import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { City, CityDocument } from './schemas/city.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCityDto } from './dto/update-city.dto';


@Injectable()
export class CitiesService {

  constructor(
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
  ) {
  }



  getAll(): Promise<City[]> {
    // return this.cities;
    return this.cityModel.find().exec();
  }

  getOne(id: string): Promise<City> {
    // return this.cities.find(c => c.id === id);
    return this.cityModel.findById(id).exec();
  }

  async create(createCityDto: CreateCityDto): Promise<City> {
    return this.cityModel
      .findOneAndUpdate(
        createCityDto,
        createCityDto,
        {
          upsert: true,
          useFindAndModify: false,
          new: true
        },
      )
  }


  async remove(id: string): Promise<City> {
    return this.cityModel.findByIdAndRemove(id);
  }

  async update(id: string, updateCityDto: UpdateCityDto): Promise<City> {
    return this.cityModel.findByIdAndUpdate(
      id,
      updateCityDto,
      { upsert: true, useFindAndModify: false },
    );
  }


}
