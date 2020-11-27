import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AreasModule } from './areas/areas.module';

@Module({
  // todo: move to config
  imports: [
    CitiesModule,
    MongooseModule.forRoot(`mongodb+srv://userName:userPassword@cluster0.b7fv8.mongodb.net/real-estate?retryWrites=true&w=majority`),
    AreasModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
