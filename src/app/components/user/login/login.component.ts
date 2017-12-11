import { Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user/user.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  //properties
  username: string;
  password: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';


  constructor(private userService: UserService,
              private sharedService: SharedService,
              private router: Router) { }

  login() {

    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.userService.login(this.username, this.password)
      .subscribe(
        (data: any) => {
          this.sharedService.user = data;
          console.log(data);
          this.router.navigate(['/user',data._id])},
        (error: any) => {
          console.log(error);
        }
      );

  }

  googleLoginbtn() {
    this.userService.googleLogin().
    subscribe((response: Response) => {
      console.log(response);
    });
  }

  ngOnInit() {
  }

}
