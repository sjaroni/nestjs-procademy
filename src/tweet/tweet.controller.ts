import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get()
  getAllTweets() {
    return this.tweetService.getAllTweets();
  }

  @Get(':userId')
  public getTweets(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetService.getTweets(userId);
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
