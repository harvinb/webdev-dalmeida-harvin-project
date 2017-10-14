import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class WebsiteService {

  constructor() { }

  websites = [
    { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem", dateCreated: "9/1/2017"},
    { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem", dateCreated: "8/15/2017"},
    { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem", dateCreated: "6/10/2017" },
    { _id: "890", name: "Go",          developerId: "123", description: "Lorem", dateCreated: "9/5/2017" },
    { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem", dateCreated: "10/1/2017" },
    { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem", dateCreated: "8/20/2017" },
    { _id: "789", name: "Chess",       developerId: "234", description: "Lorem", dateCreated: "6/6/2017" }
  ];

  api = {
    'createWebsite'   : this.createWebsite,
    'findWebsiteById' : this.findWebsiteById,
    'findWebsitesByUser' : this.findWebsitesByUser,
    'updateWebsite' : this.updateWebsite,
    'deleteWebsite' : this.deleteWebsite
  };

  createWebsite(userId: string, website: any) {
    website._id = Math.random();
    website.developerId = userId;
    this.websites.push(website);
    return website;
  }

  findWebsiteById(websiteId: string) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === websiteId) {  return this.websites[x]; }
    }
  }

  findWebsitesByUser(developerId: string) {
    return this.websites.filter(site => site.developerId === developerId);
  }

  updateWebsite(websiteId, website) {
    const index = this.websites.findIndex(x => x._id === websiteId);
    this.websites[index] = website;
  }

  deleteWebsite(websiteId) {
    const index = this.websites.findIndex(x => x._id === websiteId);
    if (index !== -1) {
      this.websites.splice(index, 1);
    }
  }
}
