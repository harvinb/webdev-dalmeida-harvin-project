import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget/widget.model.client';
import {environment} from '../../../../../environments/environment';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {
  uId: string;
  wId: string;
  pId: string;
  wgId: string;
  widget: Widget;
  baseUrl = environment.baseUrl;


  constructor(private widgetService: WidgetService,
              private router: Router,
              private route: ActivatedRoute) { }

  deleteCurrentWidget() {
    this.widgetService.deleteWidget(this.wgId).subscribe((widget: Widget) => {
      this.router.navigate(['/user', this.uId,
        'website', this.wId,
        'page', this.pId,
        'widget']);
    });
  }

  updateCurWidget() {
    console.log(this.widget);
    this.widgetService.updateWidget(this.wgId, this.widget).subscribe((widget: Widget) => {
      this.router.navigate(['/user', this.uId,
        'website', this.wId,
        'page', this.pId,
        'widget']);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.wId = params['wid'];
      this.pId = params['pid'];
      this.wgId = params['wgid'];
      this.widgetService.findWidgetById(this.wgId).subscribe((widget: Widget) => {
        this.widget = widget;
        console.log(widget);
      });
    });
  }

}
