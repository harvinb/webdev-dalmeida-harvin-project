import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {NgForm} from '@angular/forms';
import {Widget} from '../../../../models/widget/widget.model.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  uId: string;
  wId: string;
  pId: string;
  wgId: string;
  widget: Widget;

  @ViewChild('f') widgetForm: NgForm;

  constructor(private widgetService: WidgetService,
              private router: Router,
              private route: ActivatedRoute) { }

  deleteCurrentWidget(){
    this.widgetService.deleteWidget(this.wgId).subscribe((widget: Widget) => {
      this.router.navigate(['/user', this.uId,
        'website', this.wId,
        'page', this.pId,
        'widget']);
    });
  }

  updateCurWidget() {
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
      });
    });
  }

}
