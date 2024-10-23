import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getOrders() {
    return [{ id: 1, item: 'Laptop komil' }, { id: 2, item: 'Phone komil' }];
  }
}
