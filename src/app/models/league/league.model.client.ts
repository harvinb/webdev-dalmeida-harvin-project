export class League {
  _id: string;
  name: string;
  owner_id: string;
  users_id: string[];

  constructor(name: string) {
    this.name = name;
  }
}
