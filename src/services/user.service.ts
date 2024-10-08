import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class UserService {

  constructor(
    private prismaService: PrismaService
  ) {}

  async login(username: string, password: string) {

    const user = await this.prismaService.client.user.findUnique({
      where: {
        username,
      },
    });
  }
}