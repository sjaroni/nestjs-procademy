import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HashtagService } from 'src/hashtag/hashtag.service';
// import { TweetService } from 'src/tweet/tweet.service';

@Injectable()
export class TasksService {

  constructor(    
    // private readonly tweetService: TweetService,
    private readonly hashtagService: HashtagService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleHashtagCleanupCheck() {
    await this.hashtagService.handleHashtagCleanupCheck();
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // async handleTweetCleanupCheck() {
  //   await this.tweetService.handleTweetCleanupCheck();
  // }
}
