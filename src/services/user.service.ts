import { Injectable } from '@nestjs/common';
import { hashPassword } from '~/utils/sha3/sha3';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async login(username: string, password: string) {
    const user = await this.prismaService.client.user.findUnique({
      where: {
        username,
      },
    });
    if (user && user.password === hashPassword(password, user.salt)) {
      return user;
    }
  }
}
