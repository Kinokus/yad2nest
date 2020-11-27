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
import { UpdateCityDto } from './dto/update-city.dto';
import { Response, Request } from 'express';
import { CitiesService } from './cities.service';
import { serialize } from 'v8';
import { City } from './schemas/city.schema';

@Controller('cities')
export class CitiesController {

  constructor(private readonly citiesService: CitiesService) {

  }

  @Get()
  getCities():Promise<City[]> {
    return this.citiesService.getAll();
  }

  // @Get()
  // // @Redirect('https://google.com', 301)
  // getCities(@Req() req: Request, @Res() res: Response) {
  //   res.status(201).end('ppp')
  //   return [];
  // }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<City> {
    return this.citiesService.getOne(id);
  }

  // @Get(':id')
  // getOne(@Param() params){
  //   return {id:params.id}
  // }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createCityDto: CreateCityDto):  Promise<City> {
    return this.citiesService.create(createCityDto);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.GONE)
  remove(@Param('id') id: string): Promise<City> {
    // todo use service
    return this.citiesService.remove(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Body() updateCityDto: UpdateCityDto,
    @Param('id') id: string
  ) :Promise<City> {
    // todo use service
    return this.citiesService.update(id, updateCityDto);
  }

}
