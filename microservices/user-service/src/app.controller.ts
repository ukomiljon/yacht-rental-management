import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './app.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern({ cmd: 'get-user' })
  getUser() {
    return this.userService.getUser();
  } @MessagePattern({ cmd: 'get-me' })
  getMe() {
    return  { id: 1, name: 'komil 22222' };
  }
}
