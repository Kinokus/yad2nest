
import { CreateStatusesEnum } from '../classes/create-statuses.enum';
import { City } from '../schemas/city.schema';

export class CreateCityDto extends City {
  status?: CreateStatusesEnum
}
