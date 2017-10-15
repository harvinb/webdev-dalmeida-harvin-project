import {Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

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

  @ViewChild('f') pageForm: NgForm;

  constructor(private pageService: PageService,
              private router: Router,
              private route: ActivatedRoute) { }

  deleteCurrentPage() {
    this.pageService.deletePage(this.pId);
    this.router.navigate(['/user', this.uId, 'website', this.wId, 'page']);
  }

  updateCurPage() {
    this.pageService.updatePage(this.pId, this.curPage);
    this.pageList = this.pageService.findPageByWebsiteId(this.wId);
    this.router.navigate(['/user', this.uId, 'website', this.wId, 'page']);
    //console.log(this.websites);
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
