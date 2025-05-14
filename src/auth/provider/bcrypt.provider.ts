import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(password: string | Buffer): Promise<string> {
    // Generate a salt
    let salt = await bcrypt.genSalt();
    // console.log(`Salt: ${salt}`);
    

    // Hash the password
    return await bcrypt.hash(password, salt);
  }

  public async comparePassword(
    plainPassword: string | Buffer,
    hashedPassword: string | Buffer,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
