import { UsersRepository } from '../../../../application/ports/users.repository';
import { User } from '../../../../domain/user';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../../database/prisma/prisma.service';
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

  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
        status: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return UserMapper.toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id,
      },
      include: {
        role: true,
        status: true,
      },
    });
  }
}
