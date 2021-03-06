import { User } from "../entity/User";
import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from "type-graphql";
import bcrypt from "bcrypt";
import Permission from "../types/Permission";
import { ApolloContextInterface } from "../context/ApolloContext";
import { ApolloError } from "apollo-server-express";

@Resolver(() => User)
export class UserResolver {
  @Query((returns) => [User])
  async users(): Promise<User[] | User | null> {
    return await User.find();
  }

  @Authorized()
  @Query((returns) => User, { nullable: true, description: "Find One User" })
  async user(@Ctx() {user}: ApolloContextInterface): Promise<User | null> {
    console.log(user);
    return await User.findOne({ id: user.id });
  }

  @Mutation(() => String, { nullable: true, description: "login" })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() apolloContext: ApolloContextInterface
  ): Promise<String> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApolloError("user not found");
    }

    const verified = await bcrypt.compare(password, user.password);

    if (!verified) {
      throw new ApolloError("invalid Password");
    }

    const auth = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = await apolloContext.jwt.sign(
      auth,
      apolloContext.JWT_TOKEN_KEY
    );

    return token;
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("phoneNumber") phoneNumber: string,
    @Arg("password") password: string,
    @Arg("name") name: string,
    @Arg("image", { nullable: true }) image?: string
  ) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);

      await User.create({
        email,
        password: hashPassword,
        phoneNumber,
        name,
        image,
      }).save();

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Query(() => Boolean)
  @Authorized()
  async comparePassword(
    @Arg("password") password: string,
    @Ctx() { user }: ApolloContextInterface
  ) {
    try {
      if (!user) {
        throw new ApolloError("invalid token");
      }

      return bcrypt.compareSync(password, user.password);
    } catch (err) {
      console.log(err);
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async updateProfile(
    @Ctx() { user }: ApolloContextInterface,
    @Arg("id") id: string,
    @Arg("name") name: string,
    @Arg("phoneNumber") phoneNumber: string,
    @Arg("image", { nullable: true }) image?: string
  ) {
    try {
      if (!user) {
        throw new ApolloError("invalid token");
      }

      if (id === user.id) {
        await User.update(
          { id: id },
          { name: name, phoneNumber: phoneNumber, image: image }
        );
        return true;
      }

      throw new ApolloError("invalid token");
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteUser(
    @Arg("id") id: string,
    @Ctx() { user }: ApolloContextInterface
  ) {
    try {
      if (!user) {
        throw new ApolloError("invalid token");
      }

      if (id === user.id) {
        const user = await User.findOne({ id: id });

        await user.remove();

        return true;
      }
      throw new ApolloError("invalid token");
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
