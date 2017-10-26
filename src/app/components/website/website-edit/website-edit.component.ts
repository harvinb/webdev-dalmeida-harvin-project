import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Website} from '../../../models/website/website.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  uId: string;
  wId: string;
  websites: Website[];
  curwebsite: Website;

  @ViewChild('f') websiteForm: NgForm;

  constructor(private webService: WebsiteService,
              private router: Router,
              private route: ActivatedRoute) { }

  deleteCurrentWebsite(){
    this.webService.deleteWebsite(this.wId).subscribe((websiteList: Website[]) => {
      this.websites = websiteList;
      this.router.navigate(['/user', this.uId, 'website']);
    });
    // console.log('websites: ',this.webService.websites);
  }

  updateCurWebsite() {
    this.webService.updateWebsite(this.wId, this.curwebsite).subscribe((website: Website[]) => {
      // this.websites = website;
      this.router.navigate(['/user', this.uId, 'website']);
    });
    // this.websites = this.webService.findWebsitesByUser(this.uId);
    // console.log(this.websites);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.wId = params['wid'];

      this.webService.findWebsitesByUser(this.uId)
        .subscribe((websiteList: Website[]) => {
          this.websites = websiteList;
        });

      this.webService.findWebsiteById(this.wId)
        .subscribe((website: Website) => {
          this.curwebsite = website;
        });
      // console.log('websites: ',this.websites);
    });
  }

}
