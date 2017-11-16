import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Team} from '../models/team/team.model.client';

// injecting service into module
@Injectable()

export class TeamService {
  baseUrl = environment.baseUrl;

  constructor(private http: Http) { }

  api = {
    'createTeam'   : this.createTeam,
    'findAllTeamsForUser' : this.findAllTeamsForLeague,
    'findTeamById' : this.findTeamById,
    'updateTeam' : this.updateTeam,
    'deleteTeam' : this.deleteTeam
  };

  createTeam(userId: string, tId: string, teamname: Team) {
    const url = this.baseUrl + '/api/user/' + userId + '/league/' + tId + '/team';

    const baseUrl = environment.baseUrl;

    return this.http.post(url, teamname)
      .map((response: Response) => {
        return response.json();
      });
  }

  findAllTeamsForLeague(tId: string) {
    const url = this.baseUrl + '/api/league/' + tId + '/team';
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findTeamById(tId: string) {
    const url = this.baseUrl + '/api/team/' + tId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateTeam(tId: string, team: Team) {
    const url = this.baseUrl + '/api/team/' + tId;
    return this.http.put(url, team)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteTeam(tId: string) {
    const url = this.baseUrl + '/api/team/' + tId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }
}
