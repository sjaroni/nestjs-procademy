import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get()
  getAllTweets() {
    return 'Hello Tweet!';
  }

  @Get(':userId')
  public getTweet(@Param('userId') userId: number) {
    return this.tweetService.getTweet(userId);
  }

  @Post()  
  public createTweet(@Body() tweet: CreateTweetDto) {
    return this.tweetService.createTweet(tweet);
  }
}
