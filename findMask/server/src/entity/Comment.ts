import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Board } from './Board';
// import { Recomment } from './ReComment';
import {User} from './User';

@Entity()
@ObjectType()
export class Comment extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column('text')
  content: string;
  
  @Field()
  @CreateDateColumn()
  create_at: Date;

  @Field()
  @UpdateDateColumn()
  update_at: Date;

  @Field(() => Board)
  @ManyToOne(type => Board, board => board.comments,
    {eager:true})
  @JoinColumn({name: "bid"})
  bid: Board;

  // @Field(() => Recomment)
  // @OneToMany(type => Recomment, recomment => recomment.comment, {nullable: true, cascade: true})
  // recomment?: Recomment;

  @Field(() => User)
  @ManyToOne(type => User, user => user.comments, {eager:true})
  @JoinColumn({name: "author"})
  author: User;
}