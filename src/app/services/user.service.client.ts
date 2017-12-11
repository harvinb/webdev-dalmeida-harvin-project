import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {User} from '../models/user/user.model.client';
import {SharedService} from './shared.service';

// injecting service into module
@Injectable()

export class UserService {
  baseUrl = environment.baseUrl;
  options = new RequestOptions();

  constructor(private http: Http,
              private router: Router,
              private sharedService: SharedService) { }

  api = {
    'createUser'   : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByUsername' : this.findUserByUsername,
    'findUserByCredentials' : this.findUserByCredentials,
    'updateUser' : this.updateUser,
    'deleteUser' : this.deleteUser,
    'login' : this.login,
    'register' : this.register,
    'googleLogin': this.googleLogin
  };

  loggedIn() {
    this.options.withCredentials = true;
    return this.http.post(this.baseUrl + '/api/loggedin', '', this.options)
      .map(
        (res: Response) => {
          const user = res.json();
          if (user !== 0) {
            this.sharedService.user = user; // setting user so as to share with all components
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }

  login(username: String, password: String) {

    this.options.withCredentials = true; // jga
    const body = {
      username : username,
      password : password
    };
    return this.http.post(this.baseUrl + '/api/login', body, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  logout() {
    this.options.withCredentials = true;
    return this.http.post(this.baseUrl + '/api/logout', '', this.options)
      .map(
        (res: Response) => {
          const data = res;
        }
      );
  }

  register(username: string, password: string) {

    this.options.withCredentials = true;
    const user: User = new User(username, password);

    return this.http.post(this.baseUrl + '/api/register', user, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  createUser(username: string, password: string) {
    const user: User = new User(username, password);
    const url = this.baseUrl + '/api/user';

    const baseUrl = environment.baseUrl;

    return this.http.post(url, user)
      .map((response: Response) => {
      return response.json();
    });
  }

  findUserById(userId: string) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserByUsername(username: string) {
    const url = this.baseUrl + '/api/user?username=' + username;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserByCredentials(username: string, password: string) {
    const url = this.baseUrl + '/api/user?username=' + username + '&password=' + password;

    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateUser(userId: string, user: User) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.put(url, user)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteUser(userId: string) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findAllUsers() {
    const url = this.baseUrl + '/api/admin/user';
    this.options.withCredentials = true;
    return this.http.get(url, this.options)
      .map((res: Response) => {
        return res.json();
      });
  }

  isAdmin() {
    const url = this.baseUrl + '/api/admin/isAdmin';
    this.options.withCredentials = true;
    return this.http.get(url, this.options)
      .map((res: Response) => {
        const user = res.json();
        if (user !== 0) {
          this.sharedService.user = user; return true;
        } else {
          this.router.navigate(['/login']); return false;
        }
      });
  }

  googleLogin() {
    console.log(this.baseUrl + '/google/login');
    return this.http.get(this.baseUrl + '/google/login')
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }


}
