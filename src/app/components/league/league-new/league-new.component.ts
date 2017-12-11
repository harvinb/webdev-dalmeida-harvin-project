import {Component, OnInit, ViewChild} from '@angular/core';
import {League} from '../../../models/league/league.model.client';
import {LeagueService} from '../../../services/league.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {PlayerServiceClient} from '../../../services/player.service.client';
import {Playerpool} from '../../../models/playerpool/playerpool.model.client';
import {User} from '../../../models/user/user.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-league-new',
  templateUrl: './league-new.component.html',
  styleUrls: ['./league-new.component.css']
})
export class LeagueNewComponent implements OnInit {
  uId: string;
  leagues: League[];
  user: User;

  @ViewChild('f') leagueForm: NgForm;

  constructor(private leagueService: LeagueService,
              private poolService: PlayerServiceClient,
              private sharedService: SharedService,
              private router: Router,
              private route: ActivatedRoute) { }

  createNewLeague() {
    const league: League = new League(this.leagueForm.value.sitename);
    this.leagueService.createLeague(this.uId, league)
      .subscribe((leagueList) => {
        console.log(leagueList);
        const pool: Playerpool = new Playerpool();
        this.poolService.createPool(this.uId,leagueList._id, pool)
          .subscribe((newpool) => {
            this.router.navigate(['/leagues']);
          });
      });
    // console.log(this.leagues);
  }

  ngOnInit() {
    this.user = this.sharedService.user || null;
    this.uId = this.user._id;
    this.leagueService.findAllLeaguesForUser(this.uId).subscribe((leagueList: League[]) => {
        this.leagues = leagueList;
    });
  }


}
