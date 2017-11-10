import {Page} from '../page/page.model.client';

export class Widget {
  _id: string;
  type: string;
  name: string;
  _page: Page;
  size: number;
  text: string;
  width: string;
  url: string;
  placeholder: string;
  description: string;
  height: string;
  rows: number;
  class: string;
  icon: string;
  deletable: boolean;
  formatted: boolean;
  dateCreated: Date;

  constructor(wgtype: string) {
    this.type = wgtype;
  }
}
