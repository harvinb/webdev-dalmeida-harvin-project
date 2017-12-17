export class Comment {
  _id: string;
  teamId: string;
  userId: string;
  cdata: string;
  date: Date;

  constructor(cdata: string) {
    this.cdata = cdata;
  }
}
