import { City } from '../schemas/city.schema';
import { DeleteStatusesEnum } from '../classes/delete-statuses.enum';

export class DeleteCityDto extends City{
  status?:DeleteStatusesEnum
}
