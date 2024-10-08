import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLErrorFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost): GraphQLError {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();
    // Log the exception or perform other actions here
    console.error('Caught GraphQL error:', exception);

    // Customize error response
    let message = 'Internal server error';
    let statusCode = 500;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    }

    ctx.code = statusCode;

    // You can customize the error format here
    return new GraphQLError(message, {
      extensions: {
        code: statusCode,
        exception, // TODO: Remove this line in production
      },
    });
  }
}
