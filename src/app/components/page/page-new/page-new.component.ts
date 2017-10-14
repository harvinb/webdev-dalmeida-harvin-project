import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  uId: string;
  wId: string;
  pageList = [{}];

  @ViewChild('f') pageForm: NgForm;

  constructor(private pageService: PageService,
              private route: ActivatedRoute) { }

  createNewPage() {
    this.pageService.createPage(this.wId,{
      name: this.pageForm.value.pagename,
      description: this.pageForm.value.pagetitle
    });
    this.pageList = this.pageService.findPageByWebsiteId(this.wId);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.wId = params['wid'];
      this.pageList = this.pageService.findPageByWebsiteId(this.wId);
    });
  }

}
