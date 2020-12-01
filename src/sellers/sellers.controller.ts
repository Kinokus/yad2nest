import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Seller } from './schemas/seller.schema';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Controller('sellers')
export class SellersController {

  constructor(private sellersService: SellersService) {
  }

  @Get()
  getSellers(): Promise<Seller[]> {
    return this.sellersService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string):Promise<Seller>{
    return this.sellersService.getOne(id)
  }

  @Get('phone/:phone')
  getByPhone(@Param('phone') phone: string):Promise<Seller>{
    return this.sellersService.getByPhone(phone)
  }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSellerDto:CreateSellerDto):Promise<Seller>{
    return this.sellersService.create(createSellerDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.GONE)
  remove(@Param('id') id: string): Promise<Seller> {

    return this.sellersService.remove(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Body() updateSellerDto: UpdateSellerDto,
    @Param('id') id: string
  ) :Promise<Seller> {

    return this.sellersService.update(id, updateSellerDto);
  }




}
