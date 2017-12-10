import { Component, OnInit } from '@angular/core';
import {PlayerServiceClient} from '../../services/player.service.client';
import {ProPlayer} from '../../models/players/proplayer.model.client';
import {ActivatedRoute} from '@angular/router';
import {Match} from '../../models/players/match.model.client';
import {MatchServiceClient} from '../../services/match.service.client';

@Component({
  selector: 'app-playerdetails',
  templateUrl: './playerdetails.component.html',
  styleUrls: ['./playerdetails.component.css']
})
export class PlayerdetailsComponent implements OnInit {
  proPlayer: ProPlayer;
  playerId: number;
  points: number;

  constructor(private playerService: PlayerServiceClient,
              private matchService: MatchServiceClient,
              private route: ActivatedRoute) { }

  getPlayerDetails() {
    this.playerService.getProPlayers()
      .subscribe((result: ProPlayer[]) => {
        // console.log(result);
        // console.log(this.playerId);
        // console.log(result.find(x => x.account_id === this.playerId));
        this.proPlayer = result.find(x => x.account_id === this.playerId);
        console.log(this.proPlayer);
        this.getPointsByTeamId(this.proPlayer.team_id);
      });
  }

  getPointsByTeamId(tId: number) {
    this.matchService.getMatchesByTeamId(tId).
    subscribe((matches: Match[]) => {
      this.points = 0;
      for (let match of matches) {
        if (!(match.radiant ? !match.radiant_win : match.radiant_win)) {
          this.points = this.points + 1;
        }
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playerId = Number(params['playerid']);
      this.getPlayerDetails();
    });
  }

}
