import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user/user.model.client';
import {SharedService} from '../../../services/shared.service';

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
              private router: Router,
              private sharedService: SharedService,
              private route: ActivatedRoute) { }

  profileupdate() {

    this.userService.findUserByUsername(this.pUser.username).
    subscribe((user: User) => {
      if (user && (user._id !== this.pUserId) ) {
        this.errorMsg = 'Username is already taken';
        this.errorFlag = true;
      } else {
        this.errorFlag = false;
        this.userService.updateUser(this.pUserId, this.pUser)
          .subscribe((status) => {
            // this.pUser = updateduser;
            console.log(status);
          });
      }
    });
  }



  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => {this.router.navigate(['']);
          this.sharedService.user = null;}
      );
  }

  ngOnInit() {
    this.pUser = this.sharedService.user || null;
    if (this.pUser) {
      this.pUserId = this.pUser._id;
    }
    // console.log(this.pUser);
  }

}
