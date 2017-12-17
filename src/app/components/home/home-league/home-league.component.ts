import { Component, OnInit } from '@angular/core';
import {LeagueService} from '../../../services/league.service.client';
import {League} from '../../../models/league/league.model.client';
import {User} from '../../../models/user/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-home-league',
  templateUrl: './home-league.component.html',
  styleUrls: ['./home-league.component.css']
})
export class HomeLeagueComponent implements OnInit {
  leagueList: League[];
  userList: User[] = [];
  user: User;
  isLoggedin: boolean;

  constructor(private leagueService: LeagueService,
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
    this.leagueService.getAllLeagues()
      .subscribe((leagues: League[]) => {
        this.leagueList = leagues;
        for (let league of this.leagueList) {
           console.log(league.owner_id);
          //this.getLeagueOwner(league.owner_id);
        }
      });
  }

  getLeagueOwner(id: string) {
    this.userService.findUserById(id).
      subscribe((user: User) => {
        // console.log(user);
        this.userList.push(user);
    });
  }

  findLeagueOwner(id: string) {
    return this.userList.find(x => x._id === id).username;
  }

  joinLeague(lId: string, league: League) {
    if(league.users_id.indexOf(this.user._id) === -1) {
      league.users_id.push(this.user._id);
      this.leagueService.updateLeague(lId, league).
        subscribe((response: Response) => {
        console.log(response);
      });
    }
  }

  leaveLeague(lId: string, league: League) {
    const itemIndex = league.users_id.indexOf(this.user._id);
    if (itemIndex !== -1) {
      league.users_id.splice(itemIndex,1);
      this.leagueService.updateLeague(lId, league).
      subscribe((response: Response) => {
        console.log(response);
      });
    }
  }

  isPartoFLeague(league: League) {
    if (this.user === null) {
      return false;
    }
    console.log(this.user._id);
    console.log(league.users_id);
    console.log(league.users_id.map(x => x._id).indexOf(this.user._id));
    if (league.users_id.map(x => x._id).indexOf(this.user._id) !== -1) {
      return true;
    }
    return false;
  }

}
