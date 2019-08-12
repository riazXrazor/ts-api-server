import { initializeDbConnection } from "#config/database";
import { User } from "#models/user";
// import { ServerError } from "#utils/server-error";
import { Get, Route, Tags } from "tsoa";

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

@Route("users")
export class UsersController {
  @Get()
  @Tags("Users")
  public async GetUsers(): Promise<User[]> {
    await initializeDbConnection();
    const users = await User.find();
    return users;
  }

  // @Get("{userId}")
  // @Tags("Users")
  // public async GetUser(userId: number): Promise<IUser> {
  //   const user = users.find((w) => w.id === userId);
  //   if (!user) {
  //     throw new ServerError(`no widget found with id ${userId}`);
  //   }

  //   return user;
  // }
}
