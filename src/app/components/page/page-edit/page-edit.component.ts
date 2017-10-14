import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  uId: string;
  wId: string;
  pId: string;
  pageList = [{}];
  curPage: any;

  constructor(private pageService: PageService,
              private router: Router,
              private route: ActivatedRoute) { }

  deleteCurrentPage() {
    this.pageService.deletePage(this.pId);
    this.router.navigate(['/user', this.uId, 'website', this.wId, 'page']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.wId = params['wid'];
      this.pId = params['pid'];
      this.pageList = this.pageService.findPageByWebsiteId(this.wId);
      this.curPage = this.pageService.findPageById(this.pId);
    });
  }

}
