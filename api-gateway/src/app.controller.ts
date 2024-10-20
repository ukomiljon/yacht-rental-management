import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy
  ) {}

  @Get('login')
  login() {
    const payload = { userId: '123' };
    return this.authService.send({ cmd: 'login' }, payload);
  }

  @Get('user')
  getUser() {
    const payload = { userId: '123' };
    return this.userService.send({ cmd: 'get-user' }, payload);
  }
}