import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import {Playerpool} from '../models/playerpool/playerpool.model.client';


const openDotaApi = 'https://api.opendota.com/api/';

@Injectable()
export class PlayerServiceClient {
  baseUrl = environment.baseUrl;

  constructor(private http: Http) { }

  api = {
    'createPool'   : this.createPool,
    'findPoolForLeague' : this.findPoolForLeague,
    'findPoolById' : this.findPoolById,
    'updatePool' : this.updatePool,
    'deletePool' : this.deletePool
  };

  getProPlayers() {
    const url = openDotaApi + 'proPlayers';

    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  createPool(uid: string, leagueId: string, pool: Playerpool) {
    const url = this.baseUrl + '/api/user/' + uid + '/league/' + leagueId + '/pool';

    const baseUrl = environment.baseUrl;

    return this.http.post(url, pool)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPoolForLeague(lId: string) {
    const url = this.baseUrl + '/api/league/' + lId + '/pool';
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPoolById(pId: string) {
    const url = this.baseUrl + '/api/pool/' + pId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updatePool(pId: string, pool: Playerpool) {
    const url = this.baseUrl + '/api/pool/' + pId;
    console.log('uppol client service');
    console.log(url);
    console.log(pool);
    return this.http.put(url, pool)
      .map((response: Response) => {
        return response.json();
      });
  }

  deletePool(pId: string) {
    const url = this.baseUrl + '/api/pool/' + pId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }


}
