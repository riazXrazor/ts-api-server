/* tslint:disable */
import { Controller } from "#controllers/controller.controller";
import { User } from "#models/user";
import { ServerError } from "#utils/server-error";
// import "reflect-metadata";
import { Body, Get, Post, Route, SuccessResponse, Tags } from "tsoa";
import v from "node-input-validator";
// @ts-ignore
function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
  const method = descriptor.value
  descriptor.value = function(){
    const context = this;
    const arg = arguments;
    let validator = new v(arg, {name:'required|email'});
    validator.check().then(function (matched: any) {
      console.log("valio",matched,validator.errors);  
    });
    method.apply(context,arg);
  }
}

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
  @validate
  public async createUser(@Body() requestBody: IUser): Promise<User> {
      const user = new User();
      user.first_name = requestBody.first_name;
      user.last_name = requestBody.last_name;
      user.email = requestBody.email;
      //user.save();
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
