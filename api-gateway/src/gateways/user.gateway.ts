import {
    Controller,
    Inject,
    Query,
    Get,

} from '@nestjs/common';
import { CurrentUser } from '../decorators';
import { IAuthResponseUser } from '../interfaces'; 
import { CommonService } from '../utils/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';


@Controller('api/v1/user')
export class UserGateway {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: ClientProxy,
        private readonly commonService: CommonService,
    ) { }

    @Get('/me')
    public async GetMe(@CurrentUser() id: string): Promise<IAuthResponseUser> {
        //return { id: 'ukomiljon', email: 'ukomiljon@gmail.com', name: 'komil', createdAt: 'aa', updatedAt: 'dd' }
        return await this.commonService.sendEvent(
            this.userService,
            { cmd: 'get-me' },
            { id },
        );
    }

    @Get('/')
    public async GetAllUsers(
        @Query() params: PaginationQueryDto,
    ): Promise<IAuthResponseUser> {
        console.log('GetAllUsers called');
        //return [{ id: 'ukomiljon', email: 'ukomiljon@gmail.com', name: 'komil', createdAt: 'aa', updatedAt: 'dd' }]
        return await this.commonService.sendEvent(
            this.userService,
            { cmd: 'get-user' },
            { ...params },
        );
    }

}
