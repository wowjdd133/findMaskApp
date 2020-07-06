import { ObjectType, Field, ID,  } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn,Column, ObjectIdColumn, ObjectID, CreateDateColumn, BaseEntity, OneToMany,} from 'typeorm';
import {Board} from './Board';
import Permission from '../types/Permission';
import { IsEmail } from 'class-validator';
import { Comment } from './Comment';
// import { Recomment } from './ReComment';

@ObjectType()
@Entity()
export class User extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Permission)
  @Column({type: 'enum',enum: Permission,default:Permission.WORKER, nullable: true})
  permission: string;

  @Field()
  @IsEmail()
  @Column({type:'varchar', length: 100,unique: true })
  email: string;

  @Field()
  @Column({type:'varchar', length: 20 })
  name: string;

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
  @OneToMany(type => Board, board => board.uid,{nullable:true,cascade: true})
  boards?: Board[];
  //board : objectID

  @Field(() => Comment)
  @OneToMany(type => Comment, comment => comment.author ,{nullable:true, cascade: true})
  comments? : Comment[]

  @Field({nullable:true})
  @Column('text', {nullable:true})
  image?: string;

  // @Field(() => Comment)
  // @OneToMany(type => Recomment, recomment => recomment.author ,{nullable:true, cascade: true})
  // recomments? : Recomment[]
}