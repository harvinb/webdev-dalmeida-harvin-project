import { Component, OnInit } from '@angular/core';
import {LeagueService} from '../../../services/league.service.client';
import {ActivatedRoute} from '@angular/router';
import {League} from '../../../models/league/league.model.client';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.css']
})
export class LeagueListComponent implements OnInit {
  uId: string;
  leagueList: League[];

  constructor(private leagueService: LeagueService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.leagueService.findAllLeaguesForUser(this.uId)
        .subscribe((websiteList: League[]) => {
          this.leagueList = websiteList;
        });
    });
  }
}
