export class Page {
  _id: string;
  name: string;
  websiteId: string;
  description: string;
  dateCreated: string;

  constructor(_id: string, name: string, description: string) {
    this._id = _id;
    this.name = name;
    this.description = description;
  }
}
