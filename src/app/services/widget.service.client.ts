import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {Widget} from '../models/widget/widget.model.client';

// injecting service into module
@Injectable()

export class WidgetService {
  baseUrl = environment.baseUrl;

  constructor(private http: Http) { }

  api = {
    'createWidget'   : this.createWidget,
    'findWidgetById' : this.findWidgetById,
    'findWidgetsByPageId' : this.findWidgetsByPageId,
    'updateWidget' : this.updateWidget,
    'deleteWidget' : this.deleteWidget
  };

  createWidget(pageId: string, widget: Widget) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.post(url, widget)
      .map((response: Response) => {
        return response.json();
      });
  }

  findWidgetById(widgetId: string) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findWidgetsByPageId(pageId: string) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateWidget(widgetId: string, widget: Widget) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.put(url, widget)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteWidget(widgetId: string) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }
}
