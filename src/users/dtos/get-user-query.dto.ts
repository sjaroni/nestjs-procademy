import { IsBooleanString, IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class GetUsersQueryDto {
  @IsOptional()
  @IsBooleanString()
  isMarried?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page = 1;
}