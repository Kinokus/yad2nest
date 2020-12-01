import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller, SellerDocument } from './schemas/seller.schema';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Injectable()
export class SellersService {
  constructor(@InjectModel(Seller.name) private sellerModel: Model<SellerDocument>) {
  }

  getAll(): Promise<Seller[]> {
    return this.sellerModel.find().exec();
  }

  create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const newSeller = new this.sellerModel(createSellerDto);
    return newSeller.save();
  }

  getOne(id: string): Promise<Seller> {
    return this.sellerModel.findById(id).exec();
  }

  getByPhone(phone: string): Promise<Seller> {
    return this.sellerModel.findOne({ phones: phone }).exec();
  }

  async remove(id: string): Promise<Seller> {
    return this.sellerModel.findByIdAndRemove(id);
  }

  async update(id: string, updateSellerDto: UpdateSellerDto) {
    return this.sellerModel.findByIdAndUpdate(id, updateSellerDto, { upsert: true, useFindAndModify: false });
  }
}
