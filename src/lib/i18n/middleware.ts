import createMiddleware from 'next-intl/middleware';
import { SUPPORTED_LOCALES } from '.';
import type { MiddleWareFactory } from '../types';

export const withInternationalization: MiddleWareFactory = (middleware) => async (request, event) => {
  const response = await middleware(request, event);

  if (request.nextUrl.pathname.startsWith('/auth')) return response;

  return createMiddleware({ locales: SUPPORTED_LOCALES, defaultLocale: 'en' })(request);
};
