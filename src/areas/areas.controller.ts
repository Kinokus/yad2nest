import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Area } from './schemas/area.schema';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';

@Controller('areas')
export class AreasController {

  constructor(private areasService: AreasService) {
  }

  @Get()
  getAreas(): Promise<Area[]> {
    return this.areasService.getAll()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAreaDto:CreateAreaDto):Promise<Area>{
    return this.areasService.create(createAreaDto)
  }


}
