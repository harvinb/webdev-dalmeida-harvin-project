import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  pUserId: string;
  pUser: User;
  errorFlag: boolean;
  errorMsg: string;

  @ViewChild('f') profileForm: NgForm;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  profileupdate() {

    this.userService.findUserByUsername(this.pUser.username).
    subscribe((user: User) => {
      if (user._id !== this.pUserId ) {
        this.errorMsg = 'Username is already taken';
        this.errorFlag = true;
      } else {
        this.userService.updateUser(this.pUserId, this.pUser)
          .subscribe((status) => {
            // this.pUser = updateduser;
            console.log(status);
          });
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pUserId = params['uid'];
      this.userService.findUserById(this.pUserId)
        .subscribe((user: User) => {
          this.pUser = user;
          console.log(user);

        });
    });
    // console.log(this.pUser);
  }

}
