import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  Req,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { Paginated } from 'src/common/pagination/pagination.interface';
import { ActiveUserType } from 'src/auth/interfaces/active-user-type.interface';
import { hash } from 'crypto';
import { User } from 'src/users/user.entity';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    private readonly paginationProvider: PaginationProvider<Tweet>,
  ) {}

  public async getAllTweets(
    pageQueryDto: PaginationQueryDto,
  ): Promise<Paginated<Tweet>> {
    // Find all the tweets

    return await this.paginationProvider.paginateQuery(
      pageQueryDto,
      this.tweetRepository,
      undefined,
      ['user', 'hashtags'],
    );
    // return await this.tweetRepository.find({
    //   relations: {
    //     user: true,
    //     hashtags: true,
    //   },
    //   order: {
    //     createdAt: 'ASC',
    //   },
    // });
  }

  public async getTweets(
    userId: number,
    pageQueryDto: PaginationQueryDto,
  ): Promise<Paginated<Tweet>> {
    // Find all the tweets of the user with the given userId
    // user is from tweet.entity
    // id is from user.entity
    // userId is from the request
    const user = await this.userService.findUserById(userId);

    if (user === null) {
      throw new NotFoundException(`User with userId ${userId} not found`);
    }

    return await this.paginationProvider.paginateQuery(
      pageQueryDto,
      this.tweetRepository,
      { user: { id: userId } },
    );

    //   return await this.tweetRepository.find({
    //     where: { user: { id: userId } },
    //     relations: {
    //       user: true,
    //       hashtags: true,
    //     },
    //     skip: (pageQueryDto.page! - 1) * pageQueryDto.limit!,
    //     take: pageQueryDto.limit,
    //     order: {
    //       createdAt: 'DESC',
    //     },
    //   }

    //   // Code before using pagination provider
    //   // ---------------------------------------------
    //   // return await this.tweetRepository.find({
    //   //   where: { user: { id: userId } },
    //   //   relations: {
    //   //     user: true,
    //   //     hashtags: true,
    //   //   },
    //   //   skip: (pageQueryDto.page! - 1) * pageQueryDto.limit!,
    //   //   take: pageQueryDto.limit,
    //   //   order: {
    //   //     createdAt: 'DESC',
    //   //   },
    //   // }
    //     // limit: 10, page: 1 > skip: 0, take: 10
    //     // limit: 10, page: 2 > skip: 10, take: 10
    //     // page 1: (1-1) * 10 = 0
    //     // page 2: (2-1) * 10 = 10
    //     // page 3: (3-1) * 10 = 20
    // );
  }

  public async createTweet(createTweetDto: CreateTweetDto, userId: number) {
    let user: User | null | undefined;
    let hashtags: string | any[] = [];

    try {
      // Find user with the given userId from user table
      user = await this.userService.findUserById(userId);

      if (user === null || user === undefined) {
        throw new Error('User not found');
      }

      // Fetch all the hashtags based on hastag array
      if (createTweetDto.hashtags) {
        hashtags = await this.hashtagService.findHashtags(
          createTweetDto.hashtags || [],
        );
      }
    } catch (error) {
      throw new RequestTimeoutException();
    }

    if (
      createTweetDto.hashtags &&
      createTweetDto.hashtags?.length !== hashtags?.length
    ) {
      // console.log('Hashtags not found');
      throw new BadRequestException();
    }

    // create a new tweet
    let tweet = this.tweetRepository.create({
      ...createTweetDto,
      user,
      hashtags,
    });

    try {
      // Save the tweet
      return await this.tweetRepository.save(tweet);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  public async updateTweet(updateTweetDto: UpdateTweetDto) {
    // Fetch all the hashtags based on hashtag array
    const hashtags = await this.hashtagService.findHashtags(
      updateTweetDto.hashtags || [],
    );

    // Find the tweet with the given id
    const tweet = await this.tweetRepository.findOneBy({
      id: updateTweetDto.id,
    });

    // Update properties of the tweet
    if (tweet) {
      tweet.text = updateTweetDto.text ?? tweet.text;
      tweet.image = updateTweetDto.image ?? tweet.image;
      tweet.hashtags = hashtags;

      // Save the tweet
      return await this.tweetRepository.save(tweet);
    }
  }

  public async deleteTweet(id: number) {
    // Find the tweet with the given id
    //const tweet = await this.tweetRepository.findOneBy({ id });

    // If tweet is not found, throw an error
    // if (tweet) {
    //   throw new Error('Tweet not found');
    // }
    return await this.tweetRepository.delete(id);
    // Delete the tweet
  }

  public async softDeleteTweet(id: number) {
    // await this.hashtagRepository.delete(id);
    await this.tweetRepository.softDelete({ id: id });
    return { deleted: true, id };
  }
}
