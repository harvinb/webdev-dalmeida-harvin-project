import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  pUserId: string;
  pUser: any;
  errorFlag: boolean;
  errorMsg: string;

  @ViewChild('f') profileForm: NgForm;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  profileupdate() {
    if (this.userService.findUserByUsername(this.pUser.username)) {
      this.errorMsg = 'Username is already taken';
      this.errorFlag = true;
    } else {
      this.userService.updateUser(this.pUserId, this.pUser);
      //console.log('user: ', this.userService.users);
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pUserId = params['uid'];
      this.pUser = this.userService.findUserById(this.pUserId);
    });
  }

}
