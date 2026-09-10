import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  // localhost:3000/welcome/?name=Adem
  // It return an object { "name": "Adem" }
  @Post('/welcome')
  postWelcome(@Query() query: any) {
    return query;
    return this.appService.sayWelcomeToTheUser();
  }
}
