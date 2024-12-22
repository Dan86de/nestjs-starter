import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../../../database/prisma/prisma.service';
import { SignUpDto } from '../../../../presenters/http/authentication/dto/sign-up.dto';
import { IamUser } from '../../../../domain/user';
import { IamUserMapper } from '../mappers/iam-user.mapper';
import { IamUsersRepository } from '../../../../application/ports/authentication-users.repository';

@Injectable()
export class IamOrmUserRepository implements IamUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(createUserDto: SignUpDto): Promise<IamUser> {
    const userData = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        role: {
          connectOrCreate: {
            where: {
              name: 'USER',
            },
            create: {
              name: createUserDto.role ?? 'USER',
            },
          },
        },
        status: {
          connectOrCreate: {
            where: {
              name: 'ACTIVE',
            },
            create: {
              name: 'ACTIVE',
            },
          },
        },
      },
      include: {
        role: true,
        status: true,
      },
    });

    return IamUserMapper.toDomain(userData);
  }

  async findByEmail(email: string): Promise<IamUser & { password: string }> {
    const userData = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
        status: true,
      },
    });

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    const domainUser = IamUserMapper.toDomain(userData);

    return { ...domainUser, password: userData.password };
  }

  async findRoleByName(name: string) {
    const role = await this.prismaService.role.findUnique({
      where: { name },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async findRoleById(id: number) {
    const role = await this.prismaService.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async findStatusByName(name: string) {
    const status = await this.prismaService.status.findUnique({
      where: { name },
    });

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    return status;
  }

  async findStatusById(id: number) {
    const status = await this.prismaService.status.findUnique({
      where: { id },
    });

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    return status;
  }
}
