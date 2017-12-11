import { Component, OnInit } from '@angular/core';
import {Match} from '../../../models/players/match.model.client';
import {MatchServiceClient} from '../../../services/match.service.client';
import {SharedService} from '../../../services/shared.service';
import {User} from '../../../models/user/user.model.client';

@Component({
  selector: 'app-home-matches',
  templateUrl: './home-matches.component.html',
  styleUrls: ['./home-matches.component.css']
})
export class HomeMatchesComponent implements OnInit {
  matches: Match[];
  user: User;
  isLoggedin: boolean;

  constructor(private matchService: MatchServiceClient,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user || null;
    this.isLoggedin = false;
    if (this.user !== null) {
      this.isLoggedin = true;
    }
    this.matchService.getAllMatches().
      subscribe((result: Match[]) => {
        this.matches = result;
        console.log(this.matches);
    });
  }

}
