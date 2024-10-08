import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  GraphQLWebsocketResolver,
  I18nModule as NestI18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'node:path';

/**
 * I18n module.
 * Accept-Language header resolver.
 */
@Module({
  imports: [
    NestI18nModule.forRoot({
      fallbackLanguage: 'en-US',
      loaderOptions: {
        path: join(__dirname, '..', '/i18n/'),
        watch: true,
      },
      resolvers: [
        GraphQLWebsocketResolver,
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
  ],
})
export class I18nModule {}
