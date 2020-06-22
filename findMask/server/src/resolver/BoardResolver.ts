import { Board } from "../entity/Board";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../entity/User";

@Resolver(Board)
export class BoardResolver {
  @Query((returns) => [Board])
  async boards() {
    return await Board.find();
  }

  @Query((retruns) => Board)
  async board(@Arg("email") email: string) {
    return await Board.find({ where: { email: email } });
  }

  @Mutation(() => Boolean)
  async writeBoard(
    @Arg("title") title: string,
    @Arg("content") content: string
  ) {
    try {
      await Board.create({
        title,
        content,
      }).save();

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
