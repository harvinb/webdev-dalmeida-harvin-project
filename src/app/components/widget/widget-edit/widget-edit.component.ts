import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';

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
      this.widget = this.widgetService.findWidgetById(this.wgId);
      console.log(this.widget.widgetType);
    });
  }

}
