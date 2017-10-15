import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';

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
    let newWidget = this.widgetService.createWidget(this.pId,{
      widgetType: wgType
    });

    if (newWidget) {
      this.router.navigate(['/user', this.uId,
        'website', this.wId,
        'page', this.pId,
        'widget', newWidget._id]);
    }

    // TODO: Routing to widget edit wont work till we can save the widget to a db
    console.log(this.widgetService.findWidgetsByPageId(this.pId));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.wId = params['wid'];
      this.pId = params['pid'];
    });
  }

}
