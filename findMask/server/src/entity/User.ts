import { ObjectType, Field, ID,  } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn,Column, ObjectIdColumn, ObjectID, CreateDateColumn, BaseEntity, OneToMany,} from 'typeorm';
import {Board} from './Board';
import Permission from '../types/Permission';

@ObjectType()
@Entity()
export class User extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Permission)
  @Column({type: 'varchar', length:5})
  permission: Permission;

  @Field()
  @Column({type:'varchar', length: 100,unique: true })
  email: string;

  @Field()
  @Column({type:'varchar', length: 11,unique: true })
  phoneNumber: string;

  @Field()
  @Column({type:'varchar', length: 100 })
  password: string;

  @Field()
  @CreateDateColumn({type: 'timestamp'})
  create_at: Date

  @Field(() => Board,{nullable:true})
  @OneToMany(type => Board, board => board.uid,{nullable:true})
  boards?: Board[];
  //board : objectID
}