import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect, Req, Res,
} from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './classes/city';
import { CreateStatusesEnum } from './classes/create-statuses.enum';
import { UpdateCityDto } from './dto/update-city.dto';
import { UpdateStatusesEnum } from './classes/update-statuses.enum';
import { DeleteStatusesEnum } from './classes/delete-statuses.enum';

import {Response, Request } from 'express'
import { CitiesService } from './cities.service';
import { serialize } from 'v8';

@Controller('cities')
export class CitiesController {

  constructor(private readonly citiesService: CitiesService) {

  }

  @Get()
  getCities() {
    return this.citiesService.getAll();
  }

  // @Get()
  // // @Redirect('https://google.com', 301)
  // getCities(@Req() req: Request, @Res() res: Response) {
  //   res.status(201).end('ppp')
  //   return [];
  // }

  @Get(':id')
  getOne(@Param('id') id: string): City {
    return this.citiesService.getOne(id);
  }

  // @Get(':id')
  // getOne(@Param() params){
  //   return {id:params.id}
  // }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createCityDto: CreateCityDto): CreateCityDto {
    return this.citiesService.create(createCityDto)
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    // todo use service
    return{
      id, status:DeleteStatusesEnum.Success
    }
  }

  @Put(':id')
  update(@Body() updateCityDto: UpdateCityDto, @Param('id') id: string): UpdateCityDto {
    // todo use service
    return {
      ...updateCityDto, id, status: UpdateStatusesEnum.Success,
    };
  }

}
