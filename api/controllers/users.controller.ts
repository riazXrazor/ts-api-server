/* tslint:disable */
import { Controller } from "#controllers/controller.controller";
import { User } from "#models/user";
import { ServerError } from "#utils/server-error";
// import "reflect-metadata";
import { Body, Get, Post, Route, SuccessResponse, Tags } from "tsoa";
import v from "node-input-validator";
// @ts-ignore


function validate(rules: any){
  return function (_target: any, _propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    const method = descriptor.value
    let result = Reflect.getMetadataKeys(_target);
    console.log(result)
    descriptor.value = function(){
      const context = this;
      const arg = arguments;
      let validator = new v(arg[0],rules);
      return validator.check().then(function (matched: any) {
        // console.log("valio",target,propertyName,method); 
        if(matched){
          method.apply(context,arg, method);
        } else {
          return validator.errors
        }
      });
     
    }
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
  @validate({
    first_name: 'required',
    last_name: 'required',
    email: 'required|email'
  })
  public async createUser(@Body() createUser: IUser): Promise<User> {
      const user = new User();
      user.first_name = createUser.first_name;
      user.last_name = createUser.last_name;
      user.email = createUser.email;
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
