export class Widget {
  _id: string;
  widgetType: string;
  name: string;
  pageId: string;
  size: number;
  text: string;
  width: string;
  url: string;

  constructor(_id: string, wgtype: string) {
    this._id = _id;
    this.widgetType = wgtype;
  }
}
