import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from './logger.service';
import { ConfigService } from '@nestjs/config';
import { AppEnvironmentVariables } from '../config/app.config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: LoggerService,
    private readonly configService: ConfigService<AppEnvironmentVariables>,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const isTestEnv = this.configService.get(`NODE_ENV`) === 'test';
    if (isTestEnv) {
      return next();
    }
    const start = Date.now();
    const { method, url, headers, query, body } = req;

    res.on('finish', () => {
      const responseTime = Date.now() - start;
      const message = `${method} ${url} ${res.statusCode} ${responseTime}ms`;
      const statusCode = res.statusCode;
      const logData = {
        responseTime,
        method,
        url,
        headers,
        query,
        body,
      };

      if (statusCode >= 500) {
        this.logger.error(message, undefined, `HTTP`, logData);
      } else if (statusCode >= 400) {
        this.logger.warn(message, `HTTP`, logData);
      } else {
        this.logger.log(message, `HTTP`, logData);
      }
    });

    next();
  }
}
