import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from '../cities/schemas/city.schema';
import { Model } from 'mongoose';
import { Hood, HoodDocument } from './schemas/hood.schema';

@Injectable()
export class HoodsService {
  constructor(@InjectModel(Hood.name) private hoodModel: Model<HoodDocument>,) {
  }
  getByCityId(id: string) {
    return this.hoodModel.find({cityId:id})
  }



}
