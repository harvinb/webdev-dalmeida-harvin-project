import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {Website} from '../models/website/website.model.client';

// injecting service into module
@Injectable()

export class WebsiteService {
  baseUrl = environment.baseUrl;

  constructor(private http: Http) { }

  api = {
    'createWebsite'   : this.createWebsite,
    'findWebsiteById' : this.findWebsiteById,
    'findWebsitesByUser' : this.findWebsitesByUser,
    'updateWebsite' : this.updateWebsite,
    'deleteWebsite' : this.deleteWebsite
  };

  createWebsite(userId: string, website: Website) {
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this.http.post(url, website)
      .map((response: Response) => {
        return response.json();
      });
  }

  findWebsiteById(websiteId: string) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findWebsitesByUser(developerId: string) {
    const url = this.baseUrl + '/api/user/' + developerId + '/website';
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateWebsite(websiteId: string, website: Website) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.put(url, website)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteWebsite(websiteId: string) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }
}
