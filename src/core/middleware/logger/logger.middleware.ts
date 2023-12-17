import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}
  use(req: Request, res: Response, next: () => void) {
    const start = Date.now();
    const { method, url, headers, query, body } = req;
    res.on('finish', () => {
      const responseTime = Date.now() - start;
      const logData = {
        responseTime,
        method,
        url,
        headers,
        query,
        body,
      };
      const logMessage = `${method} ${url} ${res.statusCode} ${responseTime}ms}`;
      const { statusCode } = res;
      if (statusCode === 500) {
        this.logger.error(logMessage, undefined, 'HTTP', logData);
      } else if (statusCode >= 400) {
        this.logger.warn(logMessage, 'HTTP', logData);
      } else {
        this.logger.log(logMessage, 'HTTP', logData);
      }
    });
    next();
  }
}
