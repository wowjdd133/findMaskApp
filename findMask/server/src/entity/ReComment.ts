// import {Comment} from './Comment';
// import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { ObjectType, Field, ID } from 'type-graphql';
// import {User} from '../entity/User';

// @ObjectType()
// @Entity()
// export class Recomment extends BaseEntity{
//   @Field(() => ID)
//   @PrimaryGeneratedColumn()
//   id : string;

//   @Field()
//   @Column('text')
//   content: string;

//   @Field(() => Comment)
//   @ManyToOne(type => Comment, comment => comment.recomment, {eager:true})
//   @JoinColumn({name: "comment"})
//   comment: Comment;

//   @Field(() => User)
//   @ManyToOne(type => User, user => user.recomments, {eager:true})
//   @JoinColumn({name: "author"})
//   author: User;

//   @Field()
//   @CreateDateColumn()
//   create_at: Date;

//   @Field()
//   @UpdateDateColumn()
//   update_at: Date;
// }