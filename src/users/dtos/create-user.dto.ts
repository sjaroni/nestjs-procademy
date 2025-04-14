import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

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

  @IsOptional()
  profile?: CreateProfileDto;
  // profile?: CreateProfileDto | null; // Optional profile field
}
