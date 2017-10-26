import { Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user/user.model.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  //properties
  //username: String;
  //password: String;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';


  constructor(private userService: UserService,
              private router: Router) { }

  login() {
    this.userService.findUserByCredentials
    (this.loginForm.value.username, this.loginForm.value.password).
      subscribe((user: User) => {
      if (user) {
        this.router.navigate(['/user', user._id]);
      } else {
        this.errorFlag = true;
      }
    });
  }

  ngOnInit() {
  }

}
