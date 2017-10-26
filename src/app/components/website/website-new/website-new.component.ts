import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Website} from '../../../models/website/website.model.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  uId: string;
  websites: Website[];

  @ViewChild('f') websiteForm: NgForm;

  constructor(private webService: WebsiteService,
              private router: Router,
              private route: ActivatedRoute) { }

  createNewWebsite() {
    const website: Website = new Website
      ('', this.websiteForm.value.sitename, this.websiteForm.value.description);
    this.webService.createWebsite(this.uId, website)
      .subscribe((websiteList: Website[]) => {
        this.websites = websiteList;
        console.log(websiteList);
        this.router.navigate(['/user', this.uId, 'website']);
    });
    // console.log(this.websites);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.webService.findWebsitesByUser(this.uId).subscribe((websiteList: Website[]) => {
        this.websites = websiteList;
      });
    });
  }

}
