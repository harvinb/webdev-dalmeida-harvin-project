import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../../../services/team.service.client';
import {Team} from '../../../models/team/team.model.client';
import {User} from '../../../models/user/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-home-team',
  templateUrl: './home-team.component.html',
  styleUrls: ['./home-team.component.css']
})
export class HomeTeamComponent implements OnInit {
  lId: string;
  teamList: Team[];
  userList: User[] = [];
  user: User;
  isLoggedin: boolean;

  constructor(private teamService: TeamService,
              private route: ActivatedRoute,
              private sharedService: SharedService,
              private userService: UserService) { }

  ngOnInit() {
    this.user = this.sharedService.user || null;
    console.log(this.sharedService.user);
    console.log(this.user);
    this.isLoggedin = false;
    if (this.user !== null) {
      this.isLoggedin = true;
    }
    this.route.params.subscribe(params => {
      this.lId = params['lid'];
      this.teamService.findAllTeamsForLeague(this.lId)
        .subscribe((teamList: Team[]) => {
          this.teamList = teamList;
          //for (let team of this.teamList) {
            //console.log(team.userId);
            // this.getTeamOwner(team.userId);
          //  console.log(team);

          //}
        });
    });
  }

  isTeamOwner() {
    if (this.teamList.map(x => x.userId._id).indexOf(this.user._id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  isTeamOwnerCog(uid: string) {
    if (uid === this.user._id) {
      return true;
    } else {
      return false;
    }
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
