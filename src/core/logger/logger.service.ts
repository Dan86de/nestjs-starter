import { Injectable, LoggerService as NestLogger } from '@nestjs/common';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../config';

@Injectable()
export class LoggerService implements NestLogger {
  private readonly logger: winston.Logger;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    const { combine, timestamp, printf, colorize, json } = winston.format;

    const isDevelopment = this.configService.get('NODE_ENV') === `development`;

    const logFormat = isDevelopment
      ? combine(
          colorize(),
          timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
          printf(({ level, message, timestamp, context, meta, trace }) => {
            return `${timestamp} ${level}: [${context}] ${message} ${
              meta ? JSON.stringify(meta) : ''
            } ${trace ? JSON.stringify(trace) : ''}`;
          }),
        )
      : combine(timestamp(), json());

    this.logger = winston.createLogger({
      level: 'info',
      format: logFormat,
      transports: [new winston.transports.Console()],
    });
  }

  log(message: any, context?: string, meta?: any) {
    this.logger.info(message, {
      context,
      meta,
    });
  }

  error(message: any, trace?: string, context?: string, meta?: any) {
    this.logger.error(message, {
      context,
      trace,
      meta,
    });
  }

  warn(message: any, context?: string, meta?: any) {
    this.logger.warn(message, {
      context,
      meta,
    });
  }

  debug(message: any, context?: string, meta?: any) {
    this.logger.debug(message, {
      context,
      meta,
    });
  }

  verbose(message: any, context?: string, meta?: any) {
    this.logger.verbose(message, {
      context,
      meta,
    });
  }
}
