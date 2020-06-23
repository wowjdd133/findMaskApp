import { ObjectType,registerEnumType, Field, ID } from 'type-graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany,  } from 'typeorm'
import {User} from './User';
import {Comment} from './Comment';


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
  upodate_at?: Date;

  @Field(() => Comment)
  @OneToMany(type => Comment, Comment => Comment.bid,{nullable: true, cascade: true})
  comments?: [Comment];
}