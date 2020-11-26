import { City } from '../classes/city';
import { DeleteStatusesEnum } from '../classes/delete-statuses.enum';

export class DeleteCityDto extends City{
  status?:DeleteStatusesEnum
}
