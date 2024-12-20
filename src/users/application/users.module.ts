import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../presenters/http/users.controller';
import { UsersInfrastructureModule } from '../infrastructure/users-infrastructure.module';

@Module({
  imports: [UsersInfrastructureModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
