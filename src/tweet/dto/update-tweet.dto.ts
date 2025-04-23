import { PartialType } from "@nestjs/mapped-types";
import { CreateTweetDto } from "./create-tweet.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateTweetDto extends PartialType(CreateTweetDto){
  @IsNotEmpty()
  @IsNumber()
  id: number;
}