import { ObjectType,registerEnumType, Field, ID, Int } from 'type-graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany,  } from 'typeorm'
import {User} from './User';
import {Comment} from './Comment';
import { IsNotEmpty } from 'class-validator';


@ObjectType()
@Entity()
export class Board extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text')
  title: string;

  @Field(() => User)
  @ManyToOne(type => User, user => user.boards,{
    eager:true
  })
  @JoinColumn({name: "uid"})
  uid: User;

  @Field()
  @Column('text')
  content: string;

  @Field()
  @CreateDateColumn({type: 'timestamp'})
  create_at: Date;

  @Field()
  @UpdateDateColumn({type: 'timestamp'})
  update_at: Date;

  @Field({nullable: true})
  @Column('text', {nullable: true})
  image?: string;

  @Field(() => Comment,{nullable:true})
  @OneToMany(type => Comment, Comment => Comment.bid,{
    cascade: true
  })
  @JoinColumn({name: "comments"})
  comments?: Comment[];

  @Field(() => Int, {defaultValue:0})
  @Column('int',{default: 0})
  viewCount: number;
}