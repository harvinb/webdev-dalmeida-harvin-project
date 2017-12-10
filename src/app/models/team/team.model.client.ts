export class Team {
  _id: string;
  name: string;
  leagueId: string;
  userId: string;
  ppList: string[];
  points: number;

  constructor(name: string) {
    this.name = name;
  }
}
