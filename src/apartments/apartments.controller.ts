import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Apartment } from './schemas/apartment.schema';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { DocumentQuery } from 'mongoose';

@Controller('apartments')
export class ApartmentsController {

  constructor(private apartmentsService: ApartmentsService) {  }

  @Get()
  getApartments(): Promise<Apartment[]> {
    return this.apartmentsService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string):Promise<Apartment>{
    return this.apartmentsService.getOne(id)
  }

  @Get('area/:id')
  getApartmentsByAreaId(@Param('id') id: string){
    return this.apartmentsService.getApartmentsByAreaId(id)
  }

  @Get('city/:id')
  getApartmentsByCityId(@Param('id') id: string){
    return this.apartmentsService.getApartmentsByCityId(id)
  }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createApartmentDto:CreateApartmentDto):Promise<Apartment>{
    return this.apartmentsService.create(createApartmentDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.GONE)
  remove(@Param('id') id: string): Promise<Apartment> {

    return this.apartmentsService.remove(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Body() updateApartmentDto: UpdateApartmentDto,
    @Param('id') id: string
  ) :Promise<Apartment> {

    return this.apartmentsService.update(id, updateApartmentDto);
  }




}
