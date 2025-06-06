// import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number)
  limit?: number = 10; // default value

  @IsOptional()
  @IsPositive()
  page?: number = 1; // default value
}
