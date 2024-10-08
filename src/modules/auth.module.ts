import { JWT } from '@app/shared/constants/jwt';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT.SECRET,
      signOptions: { expiresIn: '2 days' },
    }),
  ],
})
export class AuthModule {}
