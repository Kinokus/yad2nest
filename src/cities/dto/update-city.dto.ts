import { City } from '../schemas/city.schema';
import { UpdateStatusesEnum } from '../classes/update-statuses.enum';

export class UpdateCityDto extends City {
  // id?: string;
  // name?: string;
  status?: UpdateStatusesEnum
}
