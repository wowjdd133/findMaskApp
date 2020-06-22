import { ObjectType,registerEnumType, Field, ID } from 'type-graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,  } from 'typeorm'
import {User} from './User';


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
  @ManyToOne(type => User, user => user.boards, {
    eager: true
  })
  @JoinColumn({name: "uid"})
  uid: string;

  @Field()
  @Column('text')
  content: string;

  @Field()
  @CreateDateColumn({type: 'timestamp'})
  create_at: Date;

  @Field()
  @UpdateDateColumn({type: 'timestamp'})
  upodate_at?: Date;

  //comment
}