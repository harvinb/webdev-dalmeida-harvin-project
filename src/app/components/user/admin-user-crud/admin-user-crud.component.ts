import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-admin-user-crud',
  templateUrl: './admin-user-crud.component.html',
  styleUrls: ['./admin-user-crud.component.css']
})
export class AdminUserCrudComponent implements OnInit {
  userList: User[];
  AdUser: User;
  isLoggedin: boolean;

  constructor(private userService: UserService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.AdUser = this.sharedService.user || null;
    this.isLoggedin = false;
    if (this.AdUser !== null) {
      this.isLoggedin = true;
    }
    this.userService.findAllUsers().
      subscribe((users: User[]) => {
      this.userList = users;
    });
  }

  deleteUser(uid: string) {
    this.userService.deleteUser(uid).
      subscribe((response: Response) => {
        const itemIndex = this.userList.map(x => x._id).indexOf(uid);
        this.userList.splice(itemIndex, 1);
    });
  }

}
