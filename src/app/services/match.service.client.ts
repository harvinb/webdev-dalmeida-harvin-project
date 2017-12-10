import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Match} from '../models/players/match.model.client';


const openDotaApi = 'https://api.opendota.com/api/';

@Injectable()
export class MatchServiceClient {

  constructor(private http: Http) { }

  getMatchesByTeamId(tId: number) {
    const url = openDotaApi + 'teams/' + tId.toString() + '/matches';

    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  getAllMatches() {
    const url = openDotaApi + 'proMatches';

    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }
}
