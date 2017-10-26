import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Widget} from '../../../models/widget/widget.model.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  uId: string;
  wId: string;
  pId: string;
  widgets: Widget[];

  constructor(private widgetService: WidgetService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.wId = params['wid'];
      this.pId = params['pid'];
      this.widgetService.findWidgetsByPageId(this.pId).subscribe((widgetList: Widget[]) => {
         this.widgets = widgetList;
      });
    });
  }

  trustYoutubeUrl(url: string) {
    const youtubeId = url.split('/');
    console.log(youtubeId[youtubeId.length - 1]);
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + youtubeId[youtubeId.length - 1]);
  }

}
