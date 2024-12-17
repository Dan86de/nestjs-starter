export class User {
  constructor(
    public id: string,
    public email: string,
    public role: string,
    public status: string,
    public firstName?: string,
    public lastName?: string,
  ) {}
}
