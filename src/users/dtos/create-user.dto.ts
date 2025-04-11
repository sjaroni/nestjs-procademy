import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'First Name must be a string' })
  @IsNotEmpty({ message: 'First Name is required' })
  @MinLength(3, { message: 'First Name must be at least 3 characters long' })
  @MaxLength(100)
  firstName: string;

  @IsString({ message: 'Last Name must be a string' })
  @IsNotEmpty({ message: 'Last Name is required' })
  @MinLength(3, { message: 'Last Name must be at least 3 characters long' })
  @MaxLength(100)
  lastName: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  gender?: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8)
  @MaxLength(100)
  password: string;
}
