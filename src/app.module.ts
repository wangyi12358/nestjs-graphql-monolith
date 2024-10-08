import { Module } from '@nestjs/common';
import * as modules from './modules';
import * as resolvers from './resolvers';
import * as services from './services';

@Module({
  imports: Object.values(modules),
  providers: [
    ...Object.values(services),
    ...Object.values(resolvers),
  ],
})
export class AppModule {}
