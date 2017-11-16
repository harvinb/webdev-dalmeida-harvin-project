export class Team {
  _id: string;
  name: string;
  leagueId: string;
  userId: string;

  constructor(name: string) {
    this.name = name;
  }
}
