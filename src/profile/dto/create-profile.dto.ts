import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class CreateProfileDto {
  @IsString({ message: 'First Name must be a string' })
  @MinLength(3, { message: 'First Name must be at least 3 characters long' })
  @MaxLength(100)
  @IsOptional()
  firstName?: string;
  
  @IsString({ message: 'Last Name must be a string' })
  @MinLength(3, { message: 'Last Name must be at least 3 characters long' })
  @IsOptional()
  @MaxLength(100)
  lastName?: string;
  
  @IsString()
  @MaxLength(10)
  @IsOptional()
  gender?: string;

  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}