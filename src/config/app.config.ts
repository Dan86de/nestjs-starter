import Joi from 'joi';

export interface EnvironmentVariables {
  // Environment
  NODE_ENV: string;
  PORT: number;
  API_PREFIX: string;
  // Database
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;

  DATABASE_URL: string;

  JWT_SECRET: string;
  JWT_TOKEN_AUDIENCE: string;
  JWT_TOKEN_ISSUER: string;
  JWT_ACCESS_TOKEN_TTL: number;
  JWT_REFRESH_TOKEN_TTL: number;
}

export const configurationValidationSchema = Joi.object<EnvironmentVariables>({
  // Environment
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  API_PREFIX: Joi.string().default('api'),
  // Database
  POSTGRES_HOST: Joi.string(),
  POSTGRES_PORT: Joi.number().port().default(5432),
  POSTGRES_DB: Joi.string(),
  POSTGRES_USER: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  DATABASE_URL: Joi.string(),
  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().default(60 * 60),
  JWT_REFRESH_TOKEN_TTL: Joi.number().default(60 * 60 * 24),
});

export default (): EnvironmentVariables => {
  return {
    NODE_ENV: process.env.NODE_ENV || `development`,
    PORT: parseInt(process.env.PORT ?? '3000', 10),
    API_PREFIX: process.env.API_PREFIX ?? 'api',
    POSTGRES_USER: process.env.POSTGRES_USER ?? 'username',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? 'password',
    POSTGRES_HOST: process.env.POSTGRES_HOST ?? 'localhost',
    POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
    POSTGRES_DB: process.env.POSTGRES_DB ?? 'mydb',
    DATABASE_URL: process.env.DATABASE_URL ?? '',

    JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
    JWT_TOKEN_AUDIENCE: process.env.JWT_TOKEN_AUDIENCE ?? 'audience',
    JWT_TOKEN_ISSUER: process.env.JWT_TOKEN_ISSUER ?? 'issuer',
    JWT_ACCESS_TOKEN_TTL: parseInt(
      process.env.JWT_ACCESS_TOKEN_TTL ?? '3600',
      10,
    ),
    JWT_REFRESH_TOKEN_TTL: parseInt(
      process.env.JWT_REFRESH_TOKEN_TTL ?? '86400',
      10,
    ),
  };
};
