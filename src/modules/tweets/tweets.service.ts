import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Tweet } from './tweet.entity';
import { User } from '../users/entities';
import { CreateTweetDto, PaginationQueryDTO, UpdateTweetDto } from './dto';

@Injectable()
export class TweetsService {
    constructor(
        @InjectRepository(Tweet)
        private readonly tweetRepository: Repository<Tweet>, 
        @InjectRepository(User)
        private readonly userRepository: Repository<User>){

    }

    async getTweets({limit,offset}: PaginationQueryDTO): Promise<Tweet[]> {
        return this.tweetRepository.find({relations: ['user'], skip: offset, take: limit});
    }


    async getTweet(id: number): Promise<Tweet> {
        const tweet: Tweet  = await this.tweetRepository.findOne({where: {id},relations: ['user']});
        if(!tweet){
            throw new NotFoundException("Resource not found");
        }
        return tweet;
    }

    async createTweet({message, user}: CreateTweetDto){
        const tweet: Tweet = this.tweetRepository.create({message, user});

        return this.tweetRepository.save(tweet); 
    }

    async updateTweet(id: number, {message}: UpdateTweetDto): Promise<Tweet>{
        const tweet: Tweet = await this.tweetRepository.findOne({ where: { id } });
        if(!tweet){
            throw new NotFoundException("This tweet dont exist");
        }

        await this.tweetRepository.update(id, {message});

        return tweet; 
    }

    async removeTweet(id: number): Promise<Tweet> {
        const tweet = await this.tweetRepository.findOne({ where: { id } });
        
        if (!tweet) {
            throw new NotFoundException('User does not exist!');
        }

        return await this.tweetRepository.remove(tweet);
    }
    
}
