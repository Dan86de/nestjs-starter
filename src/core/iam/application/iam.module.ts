import { DynamicModule, Module, Type } from '@nestjs/common';
import { BcryptService } from './authentication/hashing/bcrypt.service';
import { HashingService } from './ports/hashing.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from '../presenters/http/authentication/authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { RolesGuard } from './authentication/guards/roles.guard';

@Module({
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
    AuthenticationService,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: IamModule,
      imports: [JwtModule, infrastructureModule],
    };
  }
}
