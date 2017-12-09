import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';


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


}
