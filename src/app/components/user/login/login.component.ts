import { Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  //properties
  username: String;
  password: String;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';


  constructor(private userService: UserService,
              private router: Router) { }

  login() {
    const user = this.userService.
    findUserByCredentials(this.loginForm.value.username, this.loginForm.value.password);
    if (user) {
      this.router.navigate(['/user', user._id]);
    } else {
      this.errorFlag = true;
    }
  }

  ngOnInit() {
  }

}
