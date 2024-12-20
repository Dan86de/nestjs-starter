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
  };
};
