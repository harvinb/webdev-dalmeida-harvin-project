import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {Page} from '../models/page/page.model.client';

// injecting service into module
@Injectable()

export class PageService {
  baseUrl = environment.baseUrl;

  constructor(private http: Http) { }

  api = {
    'createPage'   : this.createPage,
    'findPageById' : this.findPageById,
    'findPageByWebsiteId' : this.findPageByWebsiteId,
    'updatePage' : this.updatePage,
    'deletePage' : this.deletePage
  };

  createPage(websiteId: string, page: Page) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.post(url, page)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPageById(pageId: string) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPageByWebsiteId(websiteId: string) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updatePage(pageId: string, page: Page) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.put(url, page)
      .map((response: Response) => {
        return response.json();
      });
  }

  deletePage(pageId) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }
}
