import Joi from 'joi';

export interface EnvironmentVariables {
  // Environment
  NODE_ENV: string;
  PORT: number;
  // Database
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  // Redis
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
}

export const configurationValidationSchema = Joi.object<EnvironmentVariables>({
  // Environment
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  // Database
  POSTGRES_HOST: Joi.string(),
  POSTGRES_PORT: Joi.number().port().default(5432),
  POSTGRES_DB: Joi.string(),
  POSTGRES_USER: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  //  Redis
  REDIS_HOST: Joi.string(),
  REDIS_PORT: Joi.number().port().default(6379),
  REDIS_USERNAME: Joi.string().valid(''),
  REDIS_PASSWORD: Joi.string().valid(''),
});

export default (): EnvironmentVariables => {
  return {
    NODE_ENV: process.env.NODE_ENV || `development`,
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    POSTGRES_USER: process.env.POSTGRES_USER ?? 'username',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? 'password',
    POSTGRES_HOST: process.env.POSTGRES_HOST ?? 'localhost',
    POSTGRES_PORT: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT, 10)
      : 5432,
    POSTGRES_DB: process.env.POSTGRES_DB ?? 'mydb',
    REDIS_HOST: process.env.REDIS_HOST ?? 'localhost',
    REDIS_PORT: process.env.REDIS_PORT
      ? parseInt(process.env.REDIS_PORT, 10)
      : 6379,
    REDIS_USERNAME: process.env.REDIS_USERNAME ?? '',
    REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? '',
  };
};
