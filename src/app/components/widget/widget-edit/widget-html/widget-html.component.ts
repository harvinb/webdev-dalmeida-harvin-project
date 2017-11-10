import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {environment} from '../../../../../environments/environment';
import {Widget} from '../../../../models/widget/widget.model.client';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {
  uId: string;
  wId: string;
  pId: string;
  wgId: string;
  widget: Widget;
  baseUrl = environment.baseUrl;

  public editorContent = `<h3>I am Example 02</h3>`;

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
    this.widget.text = this.editorContent;
    console.log(this.editorContent);
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
        this.editorContent = this.widget.text;
        console.log(widget);
      });
    });
  }

}
