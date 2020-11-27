import { CitiesService } from './cities.service';
import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './schemas/city.schema';

@Module({
  providers: [CitiesService],
  controllers: [CitiesController],
  imports: [MongooseModule.forFeature([
    { name: City.name, schema: CitySchema },
  ])],


})
export class CitiesModule {

}
