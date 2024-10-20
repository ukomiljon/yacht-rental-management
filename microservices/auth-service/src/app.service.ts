import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getOrders() {
    return [{ id: 1, item: 'Laptop' }, { id: 2, item: 'Phone' }];
  }
}
