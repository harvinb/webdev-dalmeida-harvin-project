import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  uId: string;
  wId: string;
  websites = [{}];
  curwebsite: any;

  constructor(private webService: WebsiteService,
              private router: Router,
              private route: ActivatedRoute) { }

  deleteCurrentWebsite(){
    this.webService.deleteWebsite(this.wId);
    //console.log('websites: ',this.webService.websites);
    this.router.navigate(['/user', this.uId, 'website']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.wId = params['wid'];
      this.websites = this.webService.findWebsitesByUser(this.uId);
      this.curwebsite = this.webService.findWebsiteById(this.wId);
      //console.log('websites: ',this.webService.websites);
    });
  }

}
