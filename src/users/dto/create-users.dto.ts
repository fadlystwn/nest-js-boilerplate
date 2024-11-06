export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly avatar_url?: string;
}
