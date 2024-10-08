import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import httpStatusPlugin from '../plugins/http-status.plugin';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: (ctx) => ctx,
      plugins: [httpStatusPlugin],
      includeStacktraceInErrorResponses: true, // TODO: Remove this line in production
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (params) => ({ connectionParams: params }),
          path: '/graphql',
        },
      },
      typePaths: ['./schema.gql'],
      path: '/graphql',
      autoSchemaFile: join(process.cwd(), '/schema.gql'),
    }),
  ],
})
export class CustomGraphQLModule {}
