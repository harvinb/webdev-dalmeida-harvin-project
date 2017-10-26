import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user/user.model.client';

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

    this.userService.findUserByUsername(this.regForm.value.username).
    subscribe((user: User) => {
      if (user.username) {
        console.log(user);
        this.errorMsg = 'Username is already taken';
        this.errorFlag = true;
      } else if (this.regForm.value.password !== this.regForm.value.verifypwd) {
        this.errorMsg = 'Passwords do not match';
        this.errorFlag = true;
      } else {
        this.userService.createUser
        (this.regForm.value.username, this.regForm.value.password)
          .subscribe((newuser: User) => {
            if (newuser) {
              console.log(newuser);
              this.router.navigate(['/user', newuser._id]);
            }
          });
      }
    });
  }

  ngOnInit() { }

}
