import { Component, OnInit } from '@angular/core';
import {PlayerServiceClient} from '../../services/player.service.client';
import {ProPlayer} from '../../models/players/proplayer.model.client';
import {SharedService} from '../../services/shared.service';
import {Playerpool} from '../../models/playerpool/playerpool.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user/user.model.client';
import {UserService} from '../../services/user.service.client';
import {Team} from '../../models/team/team.model.client';
import {TeamService} from '../../services/team.service.client';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  playerSearchName: string;
  playerList: ProPlayer[];
  playerpool: Playerpool;
  leagueId: string;
  isLoggedin: boolean;
  isOwner: boolean;
  user: User = null;
  tid: string;
  team: Team;

  searchPlayer() {

    this.playerService.getProPlayers()
      .subscribe((presult) => {
        console.log(presult);
        console.log(this.playerSearchName);
        const pName = this.playerSearchName;

        this.playerList = presult.filter(function (proPlayer: ProPlayer) {
          return (proPlayer.is_pro === true &&
            proPlayer.is_locked === true &&
            proPlayer.name.toLowerCase().includes(pName));
        });
        console.log(this.playerList);
    });

  }

  addPlayer(playerId: number, ppname: string) {
    console.log(this.playerpool.playerPool);
    const pId = playerId.toString();
    if (!this.playerpool.playerPool) {
      this.playerpool.playerPool = [{ppid: pId, ppname: ppname}];
    } else {
      this.playerpool.playerPool.push({ppid: pId, ppname: ppname});
    }
    this.playerService.updatePool(this.playerpool._id, this.playerpool)
      .subscribe((response: Response) => {
        console.log(response);
      });
  }

  removePlayer(playerId: string, pname: string) {
    const itemIndex = this.playerpool.playerPool.
      map((item) => item.ppid).indexOf(playerId);
    console.log('index: ' + itemIndex);
    this.playerpool.playerPool.splice(itemIndex, 1);
    console.log(this.playerpool.playerPool);
    this.playerService.updatePool(this.playerpool._id, this.playerpool)
      .subscribe((response: Response) => {
        console.log(response);
      });
  }

  addPlayertoTeam(playerId: string) {
    this.team.ppList.push(playerId);
    this.teamService.updateTeam(this.tid, this.team).
      subscribe((response: Response) => {
      console.log(response);
      if (this.team.ppList.length === 5) {
        this.router.navigate(['/team', this.tid]);
      }
    });
  }

  constructor(private playerService: PlayerServiceClient,
              private sharedService: SharedService,
              private teamService: TeamService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = this.sharedService.user || null;
      this.leagueId = params['lid'];
      this.tid = null;
      if(params['tid']) {
        this.tid = params['tid'];
      }
      this.playerService.findPoolForLeague(this.leagueId)
        .subscribe((pool: Playerpool) => {
          this.playerpool = pool;

          this.isLoggedin = false;
          if (this.user !== null) {
            this.isLoggedin = true;
            if (this.user._id === this.playerpool.owner_id) {
              this.isOwner = true;
            } else {
              this.isOwner = false;
            }
          }
          /*
          console.log(this.playerpool);
          console.log(this.sharedService.user);
          console.log(this.userService.loggedIn());
          console.log(this.isOwner);
          console.log(this.playerpool.owner_id);
          */
        });
      if (this.tid !== null) {
        this.teamService.findTeamById(this.tid).
          subscribe((cteam: Team) => {
          this.team = cteam;
        });
      }
    });

    console.log('Login status:' + this.isLoggedin);
  }

}
