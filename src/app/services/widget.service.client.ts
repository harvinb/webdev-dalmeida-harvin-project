import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class WidgetService {

  constructor() { }

  widgets = [
    { _id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
    { _id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
    { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
      url: "http://lorempixel.com/400/200/"},
    { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
    { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
    { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
      url: "https://youtu.be/AM2Ivdi9c4E" },
    { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
  ];

  api = {
    'createWidget'   : this.createWidget,
    'findWidgetById' : this.findWidgetById,
    'findWidgetsByPageId' : this.findWidgetsByPageId,
    'updateWidget' : this.updateWidget,
    'deleteWidget' : this.deleteWidget
  };

  createWidget(pageId, widget: any) {
    widget._id = Math.random();
    widget.pageId = pageId;
    this.widgets.push(widget);
    return widget;
  }

  findWidgetById(pageId: string) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === pageId) {  return this.widgets[x]; }
    }
  }

  findWidgetsByPageId(pageId: string) {
    return this.widgets.filter(widget => widget.pageId === pageId);
  }

  updateWidget(widgetId, widget) {
    const index = this.widgets.findIndex(x => x._id === widgetId);
    this.widgets[index] = widget;
  }

  deleteWidget(widgetId) {
    const index = this.widgets.findIndex(x => x._id === widgetId);
    if (index !== -1) {
      this.widgets.splice(index, 1);
    }
  }
}
