import { Component, OnInit } from '@angular/core';
import {LeagueService} from '../../../services/league.service.client';
import {League} from '../../../models/league/league.model.client';
import {User} from '../../../models/user/user.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-admin-league-list',
  templateUrl: './admin-league-list.component.html',
  styleUrls: ['./admin-league-list.component.css']
})
export class AdminLeagueListComponent implements OnInit {
  leagueList : League[];
  user: User;
  isLoggedin: boolean;

  constructor(private leagueService: LeagueService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user || null;
    this.isLoggedin = false;
    if (this.user !== null) {
      this.isLoggedin = true;
    }
    this.leagueService.getAllLeagues().
      subscribe((leagueList: League[]) => {
        this.leagueList = leagueList;
    });
  }

  deleteLeague(lId: string) {
    this.leagueService.deleteLeague(lId).
      subscribe((resposnse: Response) => {
        console.log(resposnse);
        this.leagueService.getAllLeagues().
        subscribe((leagueList: League[]) => {
          this.leagueList = leagueList;
        });
    });
  }



}
