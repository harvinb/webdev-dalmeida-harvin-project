import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user/user.model.client';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../../../services/team.service.client';
import {Team} from '../../../models/team/team.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  isLoggedin: boolean;
  isAdmin: boolean;
  curUser: User;
  user: User;
  uid: string;
  teamList: Team[];
  errorFlag: boolean;
  errorMsg: string;

  @ViewChild('f') profileForm: NgForm;

  constructor(private userService: UserService,
              private sharedService: SharedService,
              private route: ActivatedRoute,
              private teamService: TeamService) { }

  profileupdate() {

    this.userService.findUserByUsername(this.user.username).
    subscribe((user: User) => {
      if (user && (user._id !== this.uid) ) {
        this.errorMsg = 'Username is already taken';
        this.errorFlag = true;
      } else {
        this.errorFlag = false;
        this.userService.updateUser(this.uid, this.user)
          .subscribe((status) => {
            // this.pUser = updateduser;
            console.log(status);
          });
      }
    });
  }

  ngOnInit() {
    this.curUser = this.sharedService.user || null;
    // console.log(this.curUser)
    this.isLoggedin = false;
    if (this.curUser !== null) {
      this.isLoggedin = true;
      if (this.curUser.roles.indexOf('ADMIN') !== -1) {
        this.isAdmin = true;
      }
    }

    this.route.params.subscribe(params => {
      this.uid = params['uid'];
      this.userService.findUserById(this.uid)
        .subscribe((user: User) => {
          this.user = user;
          this.teamService.findAllTeamsForUser(this.uid).
            subscribe((teams: Team[]) => {
            this.teamList = teams;
            console.log(this.user);
            console.log(this.teamList);
          });
        });
    });

    // console.log(this.isAdmin);
  }

}
