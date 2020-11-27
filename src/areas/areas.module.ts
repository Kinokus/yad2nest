import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from './schemas/area.schema';
import { AreasController } from './areas.controller';

@Module({
  providers: [AreasService],
  controllers: [AreasController],
  imports: [MongooseModule.forFeature([
    { name: Area.name, schema: AreaSchema },
  ])],
})
export class AreasModule {
}
