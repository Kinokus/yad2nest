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

@Controller('cities')
export class CitiesController {

  @Get()
  getCities() {

    return [];
  }

  // @Get()
  // // @Redirect('https://google.com', 301)
  // getCities(@Req() req: Request, @Res() res: Response) {
  //   res.status(201).end('ppp')
  //   return [];
  // }

  @Get(':id')
  getOne(@Param('id') id: string): City {
    return { id, name: '' };
  }

  // @Get(':id')
  // getOne(@Param() params){
  //   return {id:params.id}
  // }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createCityDto: CreateCityDto): CreateCityDto {
    return { ...createCityDto, status: CreateStatusesEnum.Success };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return{
      id, status:DeleteStatusesEnum.Success
    }
  }

  @Put(':id')
  update(@Body() updateCityDto: UpdateCityDto, @Param('id') id: string): UpdateCityDto {
    return {
      ...updateCityDto, id, status: UpdateStatusesEnum.Success,
    };
  }

}
