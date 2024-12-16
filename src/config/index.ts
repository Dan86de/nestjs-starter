import Joi from 'joi';

export interface EnvironmentVariables {
  // Environment
  NODE_ENV: string;
  PORT: number;
  // Database
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
}

export const configurationValidationSchema = Joi.object<EnvironmentVariables>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
});

export default (): EnvironmentVariables => {
  return {
    NODE_ENV: process.env.NODE_ENV || `development`,
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    POSTGRES_USER: process.env.POSTGRES_USER ?? 'username',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? 'password',
  };
};
