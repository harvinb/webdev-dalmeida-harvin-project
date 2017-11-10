import {Website} from '../website/website.model.client';

export class Page {
  _id: string;
  name: string;
  _website: Website;
  description: string;
  dateCreated: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
