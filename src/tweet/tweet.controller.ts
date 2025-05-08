import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { GetTweetQueryDto } from './dto/get-tweet-query.dto';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  //localhost:3000/tweet
  //localhost:3000/tweet?limit=10&page=1
  @Get()
  getAllTweets(
    // @Query() getTweetQueryDto: GetTweetQueryDto,    
  ) {
    // console.log(getTweetQueryDto);    
    // console.log('Pagination Query:', paginationQuery);
    return this.tweetService.getAllTweets();
  }

  //localhost:3000/tweet/1
  //localhost:3000/tweet/1?limit=10&page=1
  //localhost:3000/tweet/1?limit=10&page=2&startdate=2024&enddate=2025
  @Get(':userId')
  public getTweets(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() paginationQuery: PaginationQueryDto,
    // @Query() getTweetQueryDto: GetTweetQueryDto,
  ) {
    // console.log(getTweetQueryDto);
    // console.log('Pagination Query:', paginationQuery);
    return this.tweetService.getTweets(userId, paginationQuery);
  }

  @Post()
  public createTweet(@Body() tweet: CreateTweetDto) {
    return this.tweetService.createTweet(tweet);
  }

  @Patch()
  public updateTweet(@Body() tweet: UpdateTweetDto) {
    this.tweetService.updateTweet(tweet);
  }

  @Delete(':id')
  public deleteTweet(@Param('id', ParseIntPipe) id: number) {
   return this.tweetService.deleteTweet(id);
  }
}
