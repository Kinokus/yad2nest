import { Module } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from './schemas/apartment.schema';
import { CitiesModule } from '../cities/cities.module';
import { AreasModule } from '../areas/areas.module';

@Module({
  controllers: [ApartmentsController],

  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Apartment.name, schema: ApartmentSchema,
        },
      ],
    ),
    CitiesModule,
    AreasModule],
  providers: [ApartmentsService],
  exports: [ApartmentsService],


})
export class ApartmentsModule {
}
