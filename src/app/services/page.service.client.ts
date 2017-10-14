import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class PageService {

  constructor() { }

  pages = [
    { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem", dateCreated: "9/1/2017" },
    { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem", dateCreated: "8/15/2017" },
    { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem", dateCreated: "6/10/2017" },
    { _id: "666", name: "Post 4", websiteId: "890", description: "Lorem", dateCreated: "9/5/2017" },
    { _id: "555", name: "Post 5", websiteId: "567", description: "Lorem", dateCreated: "8/20/2017" },
    { _id: "444", name: "Post 6", websiteId: "890", description: "Lorem", dateCreated: "6/6/2017" }
  ];

  api = {
    'createPage'   : this.createPage,
    'findPageById' : this.findPageById,
    'findPageByWebsiteId' : this.findPageByWebsiteId,
    'updatePage' : this.updatePage,
    'deletePage' : this.deletePage
  };

  createPage(websiteId, page: any) {
    page._id = Math.random();
    page.websiteId = websiteId;
    this.pages.push(page);
    return page;
  }

  findPageById(pageId: string) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {  return this.pages[x]; }
    }
  }

  findPageByWebsiteId(websiteId: string) {
    return this.pages.filter(page => page.websiteId === websiteId);
  }

  updatePage(pageId, page) {
    const index = this.pages.findIndex(x => x._id === pageId);
    this.pages[index] = page;
  }

  deletePage(pageId) {
    const index = this.pages.findIndex(x => x._id === pageId);
    if (index !== -1) {
      this.pages.splice(index, 1);
    }
  }
}
