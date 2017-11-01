import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';


const openDotaApi = 'https://api.opendota.com/api/';

@Injectable()
export class PlayerServiceClient {

  constructor(private http: Http) { }

  getProPlayers() {
    const url = openDotaApi + 'proPlayers';

    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }


}
