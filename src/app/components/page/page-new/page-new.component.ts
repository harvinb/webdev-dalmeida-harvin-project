import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {NgForm} from '@angular/forms';
import {Page} from '../../../models/page/page.model.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  uId: string;
  wId: string;
  pageList: Page[];

  @ViewChild('f') pageForm: NgForm;

  constructor(private pageService: PageService,
              private router: Router,
              private route: ActivatedRoute) { }

  createNewPage() {
    const newpage: Page = new Page
    (this.pageForm.value.pagename, this.pageForm.value.pagetitle);
    this.pageService.createPage(this.wId, newpage).subscribe((pages: Page[]) => {
      this.router.navigate(['/user', this.uId, 'website', this.wId, 'page']);
    });
    // this.pageList = this.pageService.findPageByWebsiteId(this.wId);

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.wId = params['wid'];
      this.pageService.findPageByWebsiteId(this.wId).subscribe((page: Page[]) => {
        this.pageList = page;
      });
    });
  }

}
