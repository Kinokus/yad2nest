import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApartmentsController } from './apartments/apartments.controller';
import { CitiesController } from './cities/cities.controller';
import { CitiesService } from './cities/cities.service';

@Module({
  imports: [],
  controllers: [AppController, ApartmentsController, CitiesController],
  providers: [AppService, CitiesService],
})
export class AppModule {}
