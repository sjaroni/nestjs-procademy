import { Controller, Get, Param } from '@nestjs/common';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {

  constructor(private tweetService: TweetService) {}

  @Get()
  getAllTweets() {
    return 'Hello Tweet!';
  }

  @Get(':userId')
  getTweet(@Param('userId') userId: number) {
    //return 'Hello Tweet!';
    return this.tweetService.getTweet(userId);
  }

}
