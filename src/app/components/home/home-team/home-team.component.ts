import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../../../services/team.service.client';
import {Team} from '../../../models/team/team.model.client';
import {User} from '../../../models/user/user.model.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-home-team',
  templateUrl: './home-team.component.html',
  styleUrls: ['./home-team.component.css']
})
export class HomeTeamComponent implements OnInit {
  lId: string;
  teamList: Team[];
  userList: User[] = [];

  constructor(private teamService: TeamService,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lId = params['lid'];
      this.teamService.findAllTeamsForLeague(this.lId)
        .subscribe((teamList: Team[]) => {
          this.teamList = teamList;
          for (let team of this.teamList) {
            //console.log(team.userId);
            this.getTeamOwner(team.userId);

          }
        });
    });
  }

  getTeamOwner(id: string) {
    this.userService.findUserById(id).
    subscribe((user: User) => {
      console.log(user);
      this.userList.push(user);
    });
  }

  findTeamOwner(id: string) {
    return this.userList.find(x => x._id === id).username;
  }

}
