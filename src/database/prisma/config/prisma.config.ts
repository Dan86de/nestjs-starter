import { registerAs } from '@nestjs/config';
import Joi from 'joi';
import JoiUtil, { JoiConfig } from '../../../config/utils/joi.util';

export interface PrismaEnvironmentVariables {
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  DATABASE_URL: string;
}

export default registerAs<PrismaEnvironmentVariables>('authentication', () => {
  const configs: JoiConfig<PrismaEnvironmentVariables> = {
    POSTGRES_HOST: {
      value: process.env.POSTGRES_HOST,
      joi: Joi.string().required(),
    },
    POSTGRES_PORT: {
      value: process.env.POSTGRES_PORT,
      joi: Joi.number().required(),
    },
    POSTGRES_DB: {
      value: process.env.POSTGRES_DB,
      joi: Joi.string().required(),
    },
    POSTGRES_USER: {
      value: process.env.POSTGRES_USER,
      joi: Joi.string().required(),
    },
    POSTGRES_PASSWORD: {
      value: process.env.POSTGRES_PASSWORD,
      joi: Joi.string().required(),
    },
    DATABASE_URL: {
      value: process.env.DATABASE_URL,
      joi: Joi.string().required(),
    },
  };

  return JoiUtil.validate(configs);
});
