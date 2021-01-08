import { Controller, Get, Param } from '@nestjs/common';
import { HoodsService } from './hoods.service';

@Controller('hoods')
export class HoodsController {

  constructor(private hoodsService:HoodsService) {
  }

  @Get('city/:id')
  getByCityId(@Param('id') id: string){
    return this.hoodsService.getByCityId(id)
  }

}
