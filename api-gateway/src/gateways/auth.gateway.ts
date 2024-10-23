import {
  Controller,
  Inject, 
  Get,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { CommonService } from '../utils/common';

@Controller('api/v1/auth')
export class AuthGateway {
  private readonly cookiePath = '/api/auth';
  private readonly cookieName: string = '';
  private readonly testing: boolean;
  private readonly refreshTime: number;

  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    private readonly commonService: CommonService,
  ) {

  }


  @Get('login')
  login() {
    const payload = { userId: '123' };
    return this.authService.send({ cmd: 'login' }, payload);
  }

}
