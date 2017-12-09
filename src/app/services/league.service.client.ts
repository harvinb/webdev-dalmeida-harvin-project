import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {League} from '../models/league/league.model.client';

// injecting service into module
@Injectable()

export class LeagueService {
  baseUrl = environment.baseUrl;

  constructor(private http: Http) { }

  api = {
    'createLeague'   : this.createLeague,
    'findAllLeaguesForUser' : this.findAllLeaguesForUser,
    'findLeagueById' : this.findLeagueById,
    'updateLeague' : this.updateLeague,
    'deleteLeague' : this.deleteLeague,
    'getAllLeagues' : this.getAllLeagues
  };

  createLeague(userId: string, leaguename: League) {
    const url = this.baseUrl + '/api/user/' + userId + '/league';

    const baseUrl = environment.baseUrl;

    return this.http.post(url, leaguename)
      .map((response: Response) => {
        return response.json();
      });
  }

  getAllLeagues() {
    return this.http.get(this.baseUrl + '/api/league').
      map((res: Response) => {
      return res.json();
    });
  }

  findAllLeaguesForUser(userId: string) {
    const url = this.baseUrl + '/api/user/' + userId + '/league';
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findLeagueById(lId: string) {
    const url = this.baseUrl + '/api/league/' + lId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateLeague(lId: string, league: League) {
    const url = this.baseUrl + '/api/league/' + lId;
    return this.http.put(url, league)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteLeague(lId: string) {
    const url = this.baseUrl + '/api/league/' + lId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }
}
