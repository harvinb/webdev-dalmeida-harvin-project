import { Component, OnInit } from '@angular/core';
import {Team} from '../../../models/team/team.model.client';
import {TeamService} from '../../../services/team.service.client';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user/user.model.client';
import {PlayerServiceClient} from '../../../services/player.service.client';
import {ProPlayer} from '../../../models/players/proplayer.model.client';
import {MatchServiceClient} from '../../../services/match.service.client';
import {Match} from '../../../models/players/match.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-home-team-details',
  templateUrl: './home-team-details.component.html',
  styleUrls: ['./home-team-details.component.css']
})
export class HomeTeamDetailsComponent implements OnInit {
  tId: string;
  user: User;
  isLoggedin: boolean;
  team: Team;
  proPlayerList: ProPlayer[] = [];
  totalPoints: number;

  constructor(private teamService: TeamService,
              private route: ActivatedRoute,
              private matchService: MatchServiceClient,
              private sharedService: SharedService,
              private playerService: PlayerServiceClient) { }

  ngOnInit() {
    this.user = this.sharedService.user || null;
    this.isLoggedin = false;
    if (this.user !== null) {
      this.isLoggedin = true;
    }
    this.totalPoints = 0;
    this.route.params.subscribe(params => {
      this.tId = params['tid'];
      this.teamService.findTeamById(this.tId)
        .subscribe((team: Team) => {
          this.team = team;
          for (let player of this.team.ppList) {
            this.getPlayerDetails(Number(player));
          }

          console.log(this.team);
          console.log(this.proPlayerList);
        });
    });
  }

  removeFromTeam(playerId: number) {
    const pid: string = playerId.toString();
    const itemIndex = this.team.ppList.indexOf(pid);
    if (itemIndex !== -1) {
      this.team.ppList.splice(itemIndex, 1);
      this.teamService.updateTeam(this.tId, this.team).
        subscribe((response: Response) => {
          console.log(response);
          const index = this.proPlayerList.map(x => x.account_id).indexOf(playerId);
          this.proPlayerList.splice(index, 1);
      });
    }
  }

  getPlayerDetails(playerId: number) {
    this.playerService.getProPlayers()
      .subscribe((result: ProPlayer[]) => {
        // console.log(result);
        // console.log(this.playerId);
        // console.log(result.find(x => x.account_id === this.playerId));
        const proP: ProPlayer = result.find(x => x.account_id === playerId);
        // this.getPointsByProTeamId(proP.team_id);
        this.matchService.getMatchesByTeamId(proP.team_id).
          subscribe((matches: Match[]) => {
            let points: number;
            points = 0;
            for (let match of matches) {
              if (!(match.radiant ? !match.radiant_win : match.radiant_win)) {
                points += 1;
              }
            }
            proP.fantasy_role = points;
            this.totalPoints += points;
        });
        this.proPlayerList.push(proP);
      });
  }

}
