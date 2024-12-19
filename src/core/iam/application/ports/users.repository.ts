import { IamUser } from '../../domain/user';
import { SignUpDto } from '../../presenters/http/authentication/dto/sign-up.dto';
import { IamRoleEntity } from '../../infrastructure/persistence/orm/entities/iam-role.entity';

export abstract class IamUsersRepository {
  abstract save(signUp: SignUpDto): Promise<IamUser>;
  abstract findByEmail(email: string): Promise<IamUser & { password: string }>;
  abstract findRoleByName(name: string): Promise<IamRoleEntity>;
  abstract findRoleById(id: number): Promise<IamRoleEntity>;
  abstract findStatusByName(name: string): Promise<IamRoleEntity>;
  abstract findStatusById(id: number): Promise<IamRoleEntity>;
}
