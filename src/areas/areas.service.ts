import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area, AreaDocument } from './schemas/area.schema';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreasService {
  constructor(@InjectModel(Area.name) private areaModel: Model<AreaDocument>) {
  }

  getAll(): Promise<Area[]> {
    return this.areaModel.find().exec();
  }

  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    return this.areaModel
      .findOneAndUpdate(
        createAreaDto,
        createAreaDto,
        {
          upsert: true,
          useFindAndModify: false,
          new: true
        },
      );
  }

  getOne(id: string): Promise<Area> {
    return this.areaModel.findById(id).exec();
  }


  async remove(id: string): Promise<Area> {
    return this.areaModel.findByIdAndRemove(id);
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    return this.areaModel.findByIdAndUpdate(id, updateAreaDto, { upsert: true, useFindAndModify: false });
  }
}
