import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CitiesModule } from './cities/cities.module';
import { AreasModule } from './areas/areas.module';
import { SellersModule } from './sellers/sellers.module';
import { MiscModule } from './misc/misc.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HoodsModule } from './hoods/hoods.module';



@Module({
  // todo: move to config
  imports: [
    CitiesModule,
    MongooseModule.forRoot(`mongodb+srv://userName:userPassword@cluster0.b7fv8.mongodb.net/real-estate?retryWrites=true&w=majority`),
    AreasModule,
    SellersModule,
    ApartmentsModule,
    MiscModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
    HoodsModule,
  ],
  controllers: [AppController, ],
  providers: [AppService],
})

export class AppModule {
}
