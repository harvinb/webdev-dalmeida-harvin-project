import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {Widget} from '../../../models/widget/widget.model.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {
  uId: string;
  wId: string;
  pId: string;

  constructor(private route: ActivatedRoute,
              private widgetService: WidgetService,
              private router: Router) { }

  createNewWidget(wgType: string) {
    const newWidget: Widget = new Widget(wgType);
    this.widgetService.createWidget(this.pId, newWidget).subscribe((widget: Widget) => {
      this.router.navigate(['/user', this.uId,
        'website', this.wId,
        'page', this.pId,
        'widget', widget._id]);
    });
    // TODO: Routing to widget edit wont work till we can save the widget to a db
    // console.log(this.widgetService.findWidgetsByPageId(this.pId));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.wId = params['wid'];
      this.pId = params['pid'];
    });
  }

}
