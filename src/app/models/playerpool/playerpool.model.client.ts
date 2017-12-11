export class Playerpool {
  _id: string;
  leagueId: string;
  owner_id: string;
  playerPool: {
    ppname: string;
    ppid: string
  }[];

  constructor() {
    this.playerPool = [];
  }
}
