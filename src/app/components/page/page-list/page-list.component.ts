import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../../../models/page/page.model.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  uId: string;
  wId: string;
  pageList: Page[];


  constructor(private pageService: PageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.wId = params['wid'];
      this.pageService.findPageByWebsiteId(this.wId).subscribe((pages: Page[]) => {
         this.pageList = pages;
      });
    });
  }

}
