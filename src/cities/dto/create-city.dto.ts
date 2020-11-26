import { City } from '../classes/city';
import { CreateStatusesEnum } from '../classes/create-statuses.enum';

export class CreateCityDto extends City {
  status?: CreateStatusesEnum
}
