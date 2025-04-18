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


  public async getAllTweets() {
    // Find all the tweets
    return await this.tweetRepository.find({
      relations: {
        user: true,
      },
    });
  }

  public async getTweets(userId: number) {
    // Find all the tweets of the user with the given userId
    // user is from tweet.entity
    // id is from user.entity
    // userId is from the request
    return await this.tweetRepository.find({ 
      where: {user: {id: userId}},
      relations: {
        user: true,
      },
    })
  }

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
