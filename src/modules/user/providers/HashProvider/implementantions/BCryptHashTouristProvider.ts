import { compare, hash } from 'bcryptjs';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';

export default class BCryptHashTouristProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 6);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
