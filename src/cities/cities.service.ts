import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './classes/city';

@Injectable()
export class CitiesService {

  private cities: City[] = [];

  getAll() {
    return this.cities;
  }

  getOne(id: string) {
    return this.cities.find(c => c.id === id);
  }

  create(createCityDto: CreateCityDto) {
    // todo _id -> UUID
    const cityObject = { ...createCityDto, _id: Date.now().toString() }
    this.cities.push(cityObject);
    return cityObject
  }

  remove() {

  }
}
