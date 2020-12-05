import { Controller, Get, Post, Body, Put, Param, Delete, Options } from '@nestjs/common';
import { MiscService } from './misc.service';
import { CreateMiscDto } from './dto/create-misc.dto';
import { UpdateMiscDto } from './dto/update-misc.dto';
import { FullHtmlDto } from './dto/full-html.dto';

class CitiesIdsDto {
  ids: string[];
}

@Controller('misc')
export class MiscController {
  constructor(private readonly miscService: MiscService) {
  }


  @Post('full-html')
  parseFullHtml(@Body() fullHtml: FullHtmlDto) {
    return this.miscService.parseFullHtml(fullHtml);
  }

  @Options('full-html')
  optionsFullHtml() {
    return 'ok';
  }

  @Post('check')
  checkApartments(@Body() citiesIdsDto: CitiesIdsDto) {
    const apartmentIds = citiesIdsDto.ids;

    return this.miscService.getNewIds(apartmentIds);
  }


  @Options('check')
  optionsCheckApartments() {
    return 'ok';
  }


  // @Post()
  // create(@Body() createMiscDto: CreateMiscDto) {
  //   return this.miscService.create(createMiscDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.miscService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.miscService.findOne(+id);
  // }
  //
  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateMiscDto: UpdateMiscDto) {
  //   return this.miscService.update(+id, updateMiscDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.miscService.remove(+id);
  // }
}
