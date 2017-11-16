import {Component, OnInit, ViewChild} from '@angular/core';
import {League} from '../../../models/league/league.model.client';
import {LeagueService} from '../../../services/league.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-league-new',
  templateUrl: './league-new.component.html',
  styleUrls: ['./league-new.component.css']
})
export class LeagueNewComponent implements OnInit {
  uId: string;
  leagues: League[];

  @ViewChild('f') leagueForm: NgForm;

  constructor(private leagueService: LeagueService,
              private router: Router,
              private route: ActivatedRoute) { }

  createNewLeague() {
    const league: League = new League(this.leagueForm.value.sitename);
    this.leagueService.createLeague(this.uId, league)
      .subscribe((leagueList: League[]) => {
        this.leagues = leagueList;
        console.log(leagueList);
        this.router.navigate(['/user', this.uId, 'league']);
      });
    // console.log(this.leagues);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.leagueService.findAllLeaguesForUser(this.uId).subscribe((leagueList: League[]) => {
        this.leagues = leagueList;
      });
    });
  }


}
