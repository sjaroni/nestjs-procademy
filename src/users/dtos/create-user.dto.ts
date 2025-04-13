import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(100)
  email: string;
  
  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(24)
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8)
  @MaxLength(100)
  password: string;
}
