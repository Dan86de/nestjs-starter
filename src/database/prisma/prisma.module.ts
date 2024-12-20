import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import authenticationConfig from '../../core/iam/application/authentication/config/authentication.config';

@Global()
@Module({
  imports: [ConfigModule.forFeature(authenticationConfig)],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
