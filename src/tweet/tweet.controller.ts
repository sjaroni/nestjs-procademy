import { Body, Controller, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';

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
}
