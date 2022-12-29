
import { AppService } from './app.service';
import { Body, Controller,  Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { userRequest } from './products/dto/user-request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: 200,
    type: Object,
    description: 'SignUp'
  })
  @Post('/signup')
  async signUp(@Body() req: userRequest){
    console.log('request body is%j', req);
    let result = await this.appService.signUp(req);
    return result;
  }

  @Post('/signin')
  async signIn(@Body() req: userRequest){
   
    let result = await this.appService.signIn(req);
    return result;
  }

}
