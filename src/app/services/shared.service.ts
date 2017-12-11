import {Injectable} from '@angular/core';
import {User} from '../models/user/user.model.client';

@Injectable()
export class SharedService {
  user: User = null;
}
