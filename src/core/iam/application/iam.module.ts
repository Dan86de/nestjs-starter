import { DynamicModule, Module, Type } from '@nestjs/common';
import { BcryptService } from '../infrastructure/hashing/bcrypt.service';
import { HashingService } from './ports/hashing.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from '../presenters/http/authentication/authentication.controller';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthenticationService,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: IamModule,
      imports: [infrastructureModule],
    };
  }
}
