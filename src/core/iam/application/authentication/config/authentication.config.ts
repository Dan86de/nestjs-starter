import { registerAs } from '@nestjs/config';
import Joi from 'joi';
import JoiUtil, { JoiConfig } from '../../../../../config/utils/joi.util';

export interface AuthenticationEnvironmentVariables {
  JWT_SECRET: string;
  JWT_TOKEN_AUDIENCE: string;
  JWT_TOKEN_ISSUER: string;
  JWT_ACCESS_TOKEN_TTL: number;
  JWT_REFRESH_TOKEN_TTL: number;
}

export default registerAs<AuthenticationEnvironmentVariables>(
  'authentication',
  () => {
    const configs: JoiConfig<AuthenticationEnvironmentVariables> = {
      JWT_SECRET: {
        value: process.env.JWT_SECRET,
        joi: Joi.string().required(),
      },
      JWT_TOKEN_AUDIENCE: {
        value: process.env.JWT_TOKEN_AUDIENCE,
        joi: Joi.string().required(),
      },
      JWT_TOKEN_ISSUER: {
        value: process.env.JWT_TOKEN_ISSUER,
        joi: Joi.string().required(),
      },
      JWT_ACCESS_TOKEN_TTL: {
        value: process.env.JWT_ACCESS_TOKEN_TTL,
        joi: Joi.number(),
      },
      JWT_REFRESH_TOKEN_TTL: {
        value: process.env.JWT_REFRESH_TOKEN_TTL,
        joi: Joi.number(),
      },
    };

    return JoiUtil.validate(configs);
  },
);
