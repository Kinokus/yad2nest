import { PartialType } from '@nestjs/mapped-types';
import { Apartment } from '../schemas/apartment.schema';

export class UpdateApartmentDto extends PartialType(Apartment) {}
