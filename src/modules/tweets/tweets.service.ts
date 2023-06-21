import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Tweet } from './tweet.entity';
import { CreateTweetDto, UpdateTweetDto } from './dto';



@Injectable()
export class TweetsService {
    constructor(
        @InjectRepository(Tweet)
        private readonly tweetRepository: Repository<Tweet> ){

    }

    async getTweets(): Promise<Tweet[]> {
        return this.tweetRepository.find();
    }


    async getTweet(id: number): Promise<Tweet> {
        const tweet: Tweet  = await this.tweetRepository.findOne({where: {id}});
        if(!tweet){
            throw new NotFoundException("Resource not found");
        }
        return tweet;
    }

    async createTweet({message}: CreateTweetDto){
        const tweet: Tweet = this.tweetRepository.create({message});

        return this.tweetRepository.save(tweet); 
    }

    async updateTweet(id: number, {message}: UpdateTweetDto): Promise<Tweet>{
        //const tweet = await this.tweetRepository.update({id: id}, {message: message})

        await this.tweetRepository.update(id, {message});
        const tweet: Tweet = await this.tweetRepository.findOne({ where: { id } });

        if(!tweet){
            throw new NotFoundException("This tweet dont exist");
        }

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
