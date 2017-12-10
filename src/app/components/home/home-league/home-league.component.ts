import { Component, OnInit } from '@angular/core';
import {LeagueService} from '../../../services/league.service.client';
import {League} from '../../../models/league/league.model.client';
import {User} from '../../../models/user/user.model.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-home-league',
  templateUrl: './home-league.component.html',
  styleUrls: ['./home-league.component.css']
})
export class HomeLeagueComponent implements OnInit {
  leagueList: League[];
  userList: User[] = [];

  constructor(private leagueService: LeagueService,
              private userService: UserService) { }

  ngOnInit() {
    this.leagueService.getAllLeagues()
      .subscribe((leagues: League[]) => {
        this.leagueList = leagues;
        for (let league of this.leagueList) {
          console.log(league.owner_id);
          this.getLeagueOwner(league.owner_id);
        }
      });
  }

  getLeagueOwner(id: string) {
    this.userService.findUserById(id).
      subscribe((user: User) => {
        console.log(user);
        this.userList.push(user);
    });
  }

  findLeagueOwner(id: string) {
    return this.userList.find(x => x._id === id).username;
  }

}
