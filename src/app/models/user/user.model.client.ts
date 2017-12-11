export class User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
