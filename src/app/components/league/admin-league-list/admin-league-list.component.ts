import { Component, OnInit } from '@angular/core';
import {LeagueService} from '../../../services/league.service.client';
import {League} from '../../../models/league/league.model.client';

@Component({
  selector: 'app-admin-league-list',
  templateUrl: './admin-league-list.component.html',
  styleUrls: ['./admin-league-list.component.css']
})
export class AdminLeagueListComponent implements OnInit {
  leagueList : League[];

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
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
