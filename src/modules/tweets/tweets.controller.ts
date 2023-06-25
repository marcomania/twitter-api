import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { Tweet } from './tweet.entity';
import { CreateTweetDto, PaginationQueryDTO, UpdateTweetDto } from './dto';

@Controller('tweets')
export class TweetsController {
    constructor(private readonly tweetService: TweetsService){}
    
    @Get("")
    getTweets(@Query() pagination: PaginationQueryDTO): Promise<Tweet[]>{
        return this.tweetService.getTweets(pagination);
    }
 
    @Get(":id")
    getTweet(@Param('id') id: number): Promise<Tweet> {
        return this.tweetService.getTweet(id);
    }

    @Post()
     createTweet(@Body() message: CreateTweetDto): Promise<Tweet> {
        return this.tweetService.createTweet(message);
    }

    @Patch(':id')
    updateTweet(@Param('id') id: number, @Body() tweet): Promise<Tweet>{
        return this.tweetService.updateTweet(id,tweet);
    }

    @Delete(':id')
    deleteTweet(@Param('id') id: number): Promise<Tweet> {
        return this.tweetService.removeTweet(id);
    }
}