import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRES_DAYS, JWT_SECRET } from '~/constants/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: `${JWT_EXPIRES_DAYS} days` },
    }),
  ],
})
export class AuthModule {}
