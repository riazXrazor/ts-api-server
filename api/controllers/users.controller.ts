import { Get, Route, Tags } from "tsoa";
import { ServerError } from "../utils/server-error";

export interface IUser {
  id: number;
  name: string;
}

const users: IUser[] = [
  {
    id: 1,
    name: "blue",
  },
];

@Route("users")
export class UsersController {
  @Get()
  @Tags("Users")
  public async GetUsers(): Promise<IUser[]> {
    return users;
  }

  @Get("{userId}")
  @Tags("Users")
  public async GetUser(userId: number): Promise<IUser> {
    const user = users.find((w) => w.id === userId);
    if (!user) {
      throw new ServerError(`no widget found with id ${userId}`);
    }

    return user;
  }
}
