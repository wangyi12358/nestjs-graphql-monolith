import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { I18n, I18nContext } from 'nestjs-i18n';
import { JWT_EXPIRES_DAYS } from '~/constants/jwt';
import { BusinessException } from '~/exceptions/business.exception';
import { Login } from '~/models';
import { UserService } from '~/services';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }

  @Mutation(() => Login)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
    @I18n() i18n: I18nContext,
  ) {
    const user = await this.userService.login(username, password);
    if (!user) {
      throw new BusinessException(i18n.t('result-code.user.notFound'));
    }
    const token = this.jwtService.sign(user);
    return { token, user, expiredDays: JWT_EXPIRES_DAYS };
  }
}
