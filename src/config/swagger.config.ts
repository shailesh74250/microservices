import { registerAs } from '@nestjs/config';

/**
 * Swagger configuration for Azilen NestJS API.
 *
 * @constant {Function} swaggerConfig - The configuration function for Swagger.
 */
export const swaggerConfig = registerAs('swagger', () => ({
  title: 'NestJS Boilderplate',
  description: 'API documentation for NestJS Boilderplate',
  version: '1.0',
  tag: 'users',
  documentRoute: 'api',
}));
