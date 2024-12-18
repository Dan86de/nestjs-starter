import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  lastName?: string;
  constructor(
    public userId: string,
    public userEmail: string,
    public userRole: string,
    public userStatus: string,
    public userFirstName?: string,
    public userLastName?: string,
  ) {
    this.id = userId;
    this.email = userEmail;
    this.role = userRole;
    this.status = userStatus;
    this.firstName = userFirstName;
    this.lastName = userLastName;
  }
}
