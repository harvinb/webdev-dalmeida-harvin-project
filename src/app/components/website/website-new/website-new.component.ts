import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  uId: string;
  websites = [{}];

  @ViewChild('f') websiteForm: NgForm;

  constructor(private webService: WebsiteService,
              private router: Router,
              private route: ActivatedRoute) { }

  createNewWebsite() {
    this.webService.createWebsite(this.uId,{
      name: this.websiteForm.value.sitename,
      description: this.websiteForm.value.description
    });
    this.websites = this.webService.findWebsitesByUser(this.uId);
    this.router.navigate(['/user', this.uId, 'website']);
    //console.log(this.websites);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.websites = this.webService.findWebsitesByUser(this.uId);
    });
  }

}
