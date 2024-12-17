import { UsersRepository } from '../../../../application/ports/users.repository';
import { User } from '../../../../domain/user';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../database/prisma.service';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class OrmUserRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      include: {
        role: true,
        status: true,
      },
    });
    return users.map((user) => {
      return UserMapper.toDomain(user);
    });
  }
}
