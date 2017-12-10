import { Component, OnInit } from '@angular/core';
import {TeamService} from '../../../services/team.service.client';
import {Team} from '../../../models/team/team.model.client';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user/user.model.client';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  uId: string;
  lId: string;
  teamList: Team[];

  constructor(private teamService: TeamService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // TODO : Fix for user
    this.route.params.subscribe(params => {
      this.uId = params['uid'];
      this.lId = params['lid'];
      this.teamService.findAllTeamsForLeague(this.lId)
        .subscribe((teamList: Team[]) => {
          this.teamList = teamList;
        });
    });
  }



}
