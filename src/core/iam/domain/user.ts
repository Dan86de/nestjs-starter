import { ApiProperty } from '@nestjs/swagger';

export class IamUser {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  status: string;
  constructor(
    public userId: string,
    public userEmail: string,
    public userRole: string,
    public userStatus: string,
  ) {
    this.id = userId;
    this.email = userEmail;
    this.role = userRole;
    this.status = userStatus;
  }
}
