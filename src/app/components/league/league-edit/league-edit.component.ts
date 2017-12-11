import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {LeagueService} from '../../../services/league.service.client';
import {User} from '../../../models/user/user.model.client';
import {League} from '../../../models/league/league.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {PlayerServiceClient} from '../../../services/player.service.client';

@Component({
  selector: 'app-league-edit',
  templateUrl: './league-edit.component.html',
  styleUrls: ['./league-edit.component.css']
})
export class LeagueEditComponent implements OnInit {
  user: User;
  isLoggedin: boolean;
  league: League;
  lId: string;

  @ViewChild('f') lForm: NgForm;

  constructor(private leagueService: LeagueService,
              private router: Router,
              private poolService: PlayerServiceClient,
              private route: ActivatedRoute,
              private sharedService: SharedService) { }

  updateCurLeague() {
    this.leagueService.updateLeague(this.lId, this.league).
      subscribe((response: Response) => {
        console.log(response);
        this.router.navigate(['/leagues']);
    });
  }

  deleteCurrentLeague() {
    this.leagueService.deleteLeague(this.lId).
      subscribe((response: Response) => {
        console.log(response);
        this.router.navigate(['/leagues']);
    });
  }

  removeUser(uId: string) {
    const itemIndex = this.league.users_id.map(x => x._id).indexOf(uId);
    console.log(itemIndex);
    if (itemIndex !== -1) {
      this.league.users_id.splice(itemIndex,1);
    }
  }

  ngOnInit() {
    this.user = this.sharedService.user || null;
    this.isLoggedin = false;
    if (this.user !== null) {
      this.isLoggedin = true;
    }
    this.route.params.subscribe(params => {
      this.lId = params['lid'];
      this.leagueService.findLeagueById(this.lId)
        .subscribe((league: League) => {
          this.league = league;
          console.log(this.league.users_id);
        });
    });
  }

}
