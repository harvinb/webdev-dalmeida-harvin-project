import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {Website} from '../../../models/website/website.model.client';
import {User} from '../../../models/user/user.model.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {
  uId: string;
  websiteList: Website[];
  user: any;

  constructor(private webService: WebsiteService,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.webService.findWebsitesByUser(this.uId)
        .subscribe((websiteList: Website[]) => {
          this.websiteList = websiteList;
      });

      this.userService.findUserById(this.uId).
      subscribe((user: User) => {
        this.user = user;
      });
    });
  }
}
