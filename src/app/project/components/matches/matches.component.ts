import { Component, OnInit } from '@angular/core';
import {Match} from '../../models/players/match.model.client';
import {MatchServiceClient} from '../../services/match.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Match[];
  tId: number;

  constructor(private matchService: MatchServiceClient,
              private route: ActivatedRoute) { }

  getMatchesByTeam() {
    this.matchService.getMatchesByTeamId(this.tId)
      .subscribe((result: Match[]) => {
        // console.log(result);
        // console.log(this.playerId);
        // console.log(result.find(x => x.account_id === this.playerId));
        this.matches = result;
        console.log(this.matches);
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tId = Number(params['teamid']);
      this.getMatchesByTeam();
    });
  }

}
