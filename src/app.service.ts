import { Injectable } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerService) {}

  getHello(): string {
    this.logger.log('Hello World!', 'AppService');
    return 'Hello World!';
  }
}
