import { Component, OnInit } from '@angular/core';
import {Match} from '../../../models/players/match.model.client';
import {MatchServiceClient} from '../../../services/match.service.client';

@Component({
  selector: 'app-home-matches',
  templateUrl: './home-matches.component.html',
  styleUrls: ['./home-matches.component.css']
})
export class HomeMatchesComponent implements OnInit {
  matches: Match[];

  constructor(private matchService: MatchServiceClient) { }

  ngOnInit() {
    this.matchService.getAllMatches().
      subscribe((result: Match[]) => {
        this.matches = result;
        console.log(this.matches);
    });
  }

}
