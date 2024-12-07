import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    //res.status(HttpStatus.OK).json({"mensagem": "HelloWorld"});
    return "Hello World!"
  }
}
