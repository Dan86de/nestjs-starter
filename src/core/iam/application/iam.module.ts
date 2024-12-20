import { Module } from '@nestjs/common';
import { BcryptService } from './authentication/hashing/bcrypt.service';
import { HashingService } from './ports/hashing.service';
import { AuthService } from './authentication/authentication.service';
import { AuthenticationController } from '../presenters/http/authentication/authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { RolesGuard } from './authentication/guards/roles.guard';
import { IamUsersInfrastructureModule } from '../infrastructure/persistence/iam-users-infrastructure.module';

@Module({
  imports: [JwtModule, IamUsersInfrastructureModule],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AccessTokenGuard,
    AuthService,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
