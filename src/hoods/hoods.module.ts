import { Module } from '@nestjs/common';
import { HoodsController } from './hoods.controller';
import { HoodsService } from './hoods.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from '../areas/schemas/area.schema';
import { Hood, HoodSchema } from './schemas/hood.schema';

@Module({
  controllers: [HoodsController],
  providers: [HoodsService],
  imports: [
    MongooseModule.forFeature([{ name: Hood.name, schema: HoodSchema }]),
  ],
})
export class HoodsModule {
}
