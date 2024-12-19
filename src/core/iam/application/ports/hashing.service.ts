import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  abstract hash(plain: string | Buffer): Promise<string>;
  abstract compare(plain: string, hash: string): Promise<boolean>;
}
