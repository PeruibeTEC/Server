import InfoAddress from '../infra/typeorm/entities/InfoAddress';
import InfoType from '../infra/typeorm/entities/InfoType';

export default interface ICreateInfoDTO {
  telephone: string;
  info_address_id: InfoAddress;
  info_type_id: InfoType;
}
