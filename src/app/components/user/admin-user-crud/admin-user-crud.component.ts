import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-user-crud',
  templateUrl: './admin-user-crud.component.html',
  styleUrls: ['./admin-user-crud.component.css']
})
export class AdminUserCrudComponent implements OnInit {
  userList: User[];
  AdUser: User;
  isLoggedin: boolean;
  @ViewChild('f') regForm: NgForm;

  errorFlag: boolean;
  errorMsg: string;

  constructor(private userService: UserService,
              private sharedService: SharedService) { }

  userCreate() {
    const username = this.regForm.value.username;
    const password = this.regForm.value.password;

    this.userService.findUserByUsername(username).
    subscribe((user: User) => {
      if (user) {
        // console.log(user);
        this.errorMsg = 'Username is already taken';
        this.errorFlag = true;
      } else {
        this.userService.createUser(username, password)
          .subscribe(
            (data: any) => {
              this.userService.findAllUsers().
              subscribe((users: User[]) => {
                this.userList = users;
              });
            },
            (error: any) => {
              this.errorMsg = error._body;
              this.errorFlag = true;
            }
          );
      }
    });
  }

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
