import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApartmentsController } from './apartments/apartments.controller';
import { CitiesController } from './cities/cities.controller';

@Module({
  imports: [],
  controllers: [AppController, ApartmentsController, CitiesController],
  providers: [AppService],
})
export class AppModule {}
