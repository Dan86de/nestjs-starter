import { registerAs } from '@nestjs/config';
import Joi from 'joi';
import JoiUtil, { JoiConfig } from './utils/joi.util';

export interface AppEnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  API_PREFIX: string;
}

export default registerAs<AppEnvironmentVariables>('authentication', () => {
  const configs: JoiConfig<AppEnvironmentVariables> = {
    NODE_ENV: {
      value: process.env.NODE_ENV,
      joi: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    },
    PORT: {
      value: process.env.PORT,
      joi: Joi.number().port().default(3000),
    },
    API_PREFIX: {
      value: process.env.API_PREFIX,
      joi: Joi.string().default('api'),
    },
  };

  return JoiUtil.validate(configs);
});
