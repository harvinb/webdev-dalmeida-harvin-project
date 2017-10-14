import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  register(username: string, password: string, verifyPwd: string) {
    if (this.userService.findUserByUsername(username)) {
      alert('Username already in use');
    } else if (password !== verifyPwd) {
      alert('Password does not match with verify password');
    } else {
      const user = this.userService.createUser
      ({_id: '', username: username, password: password, firstName: '', lastName: ''});
      if (user) {
        this.router.navigate(['/user', user._id]);
      }
    }
  }

  ngOnInit() {
  }

}
