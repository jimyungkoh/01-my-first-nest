import { IsEmail, IsString, Min } from 'class-validator';

export class UsersSignUpDto {
  @IsString()
  @IsEmail()
  email: string;

  @Min(4)
  @IsString()
  password: string;
}

export class UsersSignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @Min(4)
  @IsString()
  password: string;
}
