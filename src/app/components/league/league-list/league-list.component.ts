import { Component, OnInit } from '@angular/core';
import {LeagueService} from '../../../services/league.service.client';
import {ActivatedRoute} from '@angular/router';
import {League} from '../../../models/league/league.model.client';
import {User} from '../../../models/user/user.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.css']
})
export class LeagueListComponent implements OnInit {
  uId: string;
  leagueList: League[];
  user: User = null;

  constructor(private leagueService: LeagueService,
              private route: ActivatedRoute,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = this.sharedService.user || null;
      this.uId = params['uid'];
      this.leagueService.findAllLeaguesForUser(this.uId)
        .subscribe((websiteList: League[]) => {
          this.leagueList = websiteList;
          console.log(this.leagueList);
        });
    });

  }
}
