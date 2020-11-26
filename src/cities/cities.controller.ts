import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';

class City {
}

@Controller('cities')
export class CitiesController {

  @Get()
  getCities() {
    return [];
  }

  @Get(':id')
  getOne(@Param('id') id: string): City {
    return { id };
  }

  // @Get(':id')
  // getOne(@Param() params){
  //   return {id:params.id}
  // }

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    console.log(createCityDto);
    return { ...createCityDto, status: 'added' };
  }

  @Delete()
  remove() {
  }

  @Put()
  update() {
  }

}
