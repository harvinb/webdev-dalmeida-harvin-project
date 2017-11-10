import {User} from '../user/user.model.client';

export class Website {
  _id: string;
  name: string;
  _user: User;
  description: string;
  dateCreated: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
