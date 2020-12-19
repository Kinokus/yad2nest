import { Module } from '@nestjs/common';
import { MiscService } from './misc.service';
import { MiscController } from './misc.controller';
import { ApartmentsModule } from '../apartments/apartments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from '../apartments/schemas/apartment.schema';
import { TopArea, TopAreaSchema } from '../topAreas/schemas/topArea.schema';
import { Area, AreaSchema } from '../areas/schemas/area.schema';
import { Hood, HoodSchema } from '../hoods/schemas/hood.schema';
import { City, CitySchema } from '../cities/schemas/city.schema';

// import { ApartmentsService } from '../apartments/apartments.service';

@Module({
  controllers: [MiscController],
  providers: [MiscService],
  imports: [ApartmentsModule,
    MongooseModule.forFeature(
      [
        { name: Apartment.name, schema: ApartmentSchema },
        { name: TopArea.name, schema: TopAreaSchema },
        { name: Area.name, schema: AreaSchema },
        { name: Hood.name, schema: HoodSchema },
        { name: City.name, schema: CitySchema },
      ],
    ),

  ],
})
export class MiscModule {
}
