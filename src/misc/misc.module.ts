import { Module } from '@nestjs/common';
import { MiscService } from './misc.service';
import { MiscController } from './misc.controller';
import { ApartmentsModule } from '../apartments/apartments.module';
import { ApartmentsService } from '../apartments/apartments.service';

@Module({
  controllers: [MiscController],
  providers: [MiscService],
  imports: [ApartmentsModule],
})
export class MiscModule {
}
