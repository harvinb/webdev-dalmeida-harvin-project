import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  uId: string;
  wId: string;
  pId: string;
  wgId: string;
  widget: any;

  @ViewChild('f') widgetForm: NgForm;

  constructor(private widgetService: WidgetService,
              private router: Router,
              private route: ActivatedRoute) { }

  deleteCurrentWidget(){
    this.widgetService.deleteWidget(this.wgId);
    //console.log('websites: ',this.webService.websites);
    this.router.navigate(['/user', this.uId,
      'website', this.wId,
      'page', this.pId,
      'widget']);
  }

  updateCurWidget() {
    this.widgetService.updateWidget(this.wgId, this.widget);
    //console.log(this.websites);
    this.router.navigate(['/user', this.uId,
      'website', this.wId,
      'page', this.pId,
      'widget']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.wId = params['wid'];
      this.pId = params['pid'];
      this.wgId = params['wgid'];
      this.widget = this.widgetService.findWidgetById(this.wgId);
    });
  }

}
