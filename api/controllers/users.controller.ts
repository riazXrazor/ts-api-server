import { Controller } from "#controllers/controller.controller";
import { User } from "#models/user";
import { ServerError, Validate } from "#utils";
import { Body, Get, Post, Route, SuccessResponse, Tags } from "tsoa";

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
}
@Route("users")
export class UsersController extends Controller {
  @Get()
  @Tags("Users")
  public async GetUsers(): Promise<User[]> {
    const users = await User.find({});
    return users;
  }

  @SuccessResponse("201", "Created")
  @Post()
  @Tags("Users")
  @Validate({
    email: "required|email",
    first_name: "required",
    last_name: "required",
  })
  public async createUser(@Body() createUser: IUser): Promise<User> {
      const user = new User();
      user.first_name = createUser.first_name;
      user.last_name = createUser.last_name;
      user.email = createUser.email;
      // user.save();
      return user;
  }

  @Get("{userId}")
  @Tags("Users")
  public async GetUser(userId: number): Promise<IUser> {
    const user = await User.findOne(userId);
    if (!user) {
      throw new ServerError(`no user found with id ${userId}`);
    }

    return user;
  }
}
