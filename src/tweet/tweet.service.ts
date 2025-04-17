import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  getTweet(userId: number) {}

  public async createTweet(createTweetDto: CreateTweetDto) {
    // Find user with the given userId from user table
    const user = await this.userService.findUserById(createTweetDto.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // create a new tweet
    let tweet = await this.tweetRepository.create({
      ...createTweetDto,
      user: user,
    });
    // Save the tweet
    return await this.tweetRepository.save(tweet);
  }
}
