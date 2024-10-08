import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { altairExpress } from 'altair-express-middleware';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import { AppModule } from './app.module';
import { GraphQLErrorFilter } from './filters/graphql-error.filter';
import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalFilters(new GraphQLErrorFilter());
  app.enableCors({
    allowedHeaders: ['*'],
    credentials: true,
  });
  app.useGlobalGuards(new AuthGuard(app.get(JwtService), app.get(Reflector)));
  app.use(
    '/altair',
    altairExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:${port}/graphql`,
    }),
  );
  app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));
  await app.listen(port);
}
bootstrap();
