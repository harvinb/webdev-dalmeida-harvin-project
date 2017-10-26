import {Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Page} from '../../../models/page/page.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  uId: string;
  wId: string;
  pId: string;
  pageList: Page[];
  curPage: Page;

  @ViewChild('f') pageForm: NgForm;

  constructor(private pageService: PageService,
              private router: Router,
              private route: ActivatedRoute) { }

  deleteCurrentPage() {
    this.pageService.deletePage(this.pId).subscribe((pages: Page[]) => {
      this.router.navigate(['/user', this.uId, 'website', this.wId, 'page']);
    });
  }

  updateCurPage() {
    this.pageService.updatePage(this.pId, this.curPage).subscribe((page: Page) => {
      // this.curPage = page;
      this.router.navigate(['/user', this.uId, 'website', this.wId, 'page']);
    });
    // console.log(this.websites);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.wId = params['wid'];
      this.pId = params['pid'];
      this.pageService.findPageByWebsiteId(this.wId)
        .subscribe((pages: Page[]) => {
        this.pageList = pages;
        });
      this.pageService.findPageById(this.pId).subscribe((page: Page) => {
        this.curPage = page;
      });
    });
  }

}
