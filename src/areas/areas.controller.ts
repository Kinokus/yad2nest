import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Area } from './schemas/area.schema';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { City } from '../cities/schemas/city.schema';
import { UpdateCityDto } from '../cities/dto/update-city.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Controller('areas')
export class AreasController {

  constructor(private areasService: AreasService) {
  }

  @Get()
  getAreas(): Promise<Area[]> {
    return this.areasService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string):Promise<Area>{
    return this.areasService.getOne(id)
  }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAreaDto:CreateAreaDto):Promise<Area>{
    return this.areasService.create(createAreaDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.GONE)
  remove(@Param('id') id: string): Promise<Area> {

    return this.areasService.remove(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Body() updateAreaDto: UpdateAreaDto,
    @Param('id') id: string
  ) :Promise<Area> {

    return this.areasService.update(id, updateAreaDto);
  }




}
