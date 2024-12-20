import * as Joi from 'joi';
import { Schema, SchemaMap } from 'joi';

interface ConfigProps {
  value: unknown;
  joi: Schema;
}

export type JoiConfig<T> = Record<keyof T, ConfigProps>;

/**
 * Utility class to avoid duplicating code in the configuration of our namespaces.
 */
export default class JoiUtil {
  /**
   * Throws an exception if required environment variables haven't been provided
   * or if they don't meet our Joi validation rules.
   */
  static validate<T>(config: JoiConfig<T>): T {
    const schemaObj = JoiUtil.extractByPropName(config, 'joi') as SchemaMap<T>;
    const schema = Joi.object(schemaObj);
    const values = JoiUtil.extractByPropName(config, 'value') as T;

    const { error } = schema.validate(values, { abortEarly: false });
    if (error) {
      throw new Error(
        `Validation failed - Is there an environment variable missing?
        ${error.message}`,
      );
    }

    return values;
  }

  /**
   * Extract only a single property from our configuration object.
   * @param config    Entire configuration object.
   * @param propName  The property name that we want to extract.
   */
  static extractByPropName<T>(
    config: JoiConfig<T>,
    propName: keyof ConfigProps,
  ): T | SchemaMap<T> {
    /*
      Result example;
      [
        { propName: ... },
        { propName: ... }
      ]
     */
    const arr: any[] = Object.keys(config).map((key: string) => {
      return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        [key]: config[key][propName],
      };
    });

    /*
      Result example;
      {
        propName: ...,
        propName: ...
      }
     */
    return Object.assign({}, ...arr);
  }
}
