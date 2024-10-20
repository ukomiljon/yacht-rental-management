import { Module } from '@nestjs/common';
import { UserController } from './app.controller';
import { UserService } from './app.service';
 
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
