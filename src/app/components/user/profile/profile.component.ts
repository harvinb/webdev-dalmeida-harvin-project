import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  pUserId: string;
  pUser: any;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  profileupdate() {
    this.userService.updateUser(this.pUserId, this.pUser);
    //console.log('user: ' , this.userService.users);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pUserId = params['uid'];
      this.pUser = this.userService.findUserById(this.pUserId);
    });
  }

}
