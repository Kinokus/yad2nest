import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApartmentsController } from './apartments/apartments.controller';
import { CitiesController } from './cities/cities.controller';
import { CitiesService } from './cities/cities.service';
import { CitiesModule } from './cities/cities.module';
import { MongooseCoreModule } from '@nestjs/mongoose/dist/mongoose-core.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // todo: move to config
  imports: [CitiesModule, MongooseModule.forRoot(`mongodb+srv://userName:userName@cluster0.b7fv8.mongodb.net/userPassword?retryWrites=true&w=majority`)],
  controllers: [AppController, ApartmentsController],
  providers: [AppService],
})
export class AppModule {}
