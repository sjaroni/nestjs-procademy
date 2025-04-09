import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class TweetService {
  constructor(private readonly userService: UsersService) {}

  tweets: { text: String; date: Date; userId: number }[] = [
    { text: 'some tweet', date: new Date('2023-10-01'), userId: 1 },
    { text: 'some other tweet', date: new Date('2023-10-01'), userId: 1 },
    { text: 'some more tweet', date: new Date('2023-10-01'), userId: 2 },
  ];

  getAllTweets() {
    return this.tweets;
  }

  getTweet(userId: number) {
    const user = this.userService.getUserById(userId);
    const tweets = this.tweets.filter((tweet) => tweet.userId === userId);
    const response = tweets.map((tweet) => {
      return {
        text: tweet.text,
        date: tweet.date,
        name: user?.name,
      };
    });
    return response;
  }
}
