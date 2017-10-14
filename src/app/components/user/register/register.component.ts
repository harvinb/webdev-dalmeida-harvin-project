import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') regForm: NgForm;

  errorFlag: boolean;
  errorMsg: string;

  constructor(private userService: UserService,
              private router: Router) { }

  register() {
    if (this.userService.findUserByUsername(this.regForm.value.username)) {
      this.errorMsg = 'Username is already taken';
      this.errorFlag = true;
    } else if (this.regForm.value.password !== this.regForm.value.verifypwd) {
      this.errorMsg = 'Passwords do not match';
      this.errorFlag = true;
    } else {
      const user = this.userService.createUser
      ({
        _id: '',
        username: this.regForm.value.username,
        password: this.regForm.value.password,
        firstName: '',
        lastName: ''});
      if (user) {
        this.router.navigate(['/user', user._id]);
      }
    }
  }

  ngOnInit() {
  }

}
