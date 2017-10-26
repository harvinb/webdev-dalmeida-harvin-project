import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {Widget} from '../../../models/widget/widget.model.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
  wgId: string;
  widget: any;

  constructor(private widgetService: WidgetService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.wgId = params['wgid'];
      this.widgetService.findWidgetById(this.wgId).subscribe((widget: Widget) => {
         this.widget = widget;
      });
      // console.log(this.widget.widgetType);
    });
  }

}
