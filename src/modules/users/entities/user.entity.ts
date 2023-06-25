import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tweet } from "src/modules/tweets/tweet.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    name : string ;
    @Column({nullable: false})
    email: string ;
    @Column({nullable: false})
    username : string;
    @Column({nullable: false})
    password : string;
    
    @OneToMany((type) => Tweet, (tweet) => tweet.user)
    tweets : Tweet[];

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

}