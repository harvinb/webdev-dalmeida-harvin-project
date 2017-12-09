import { Component, OnInit } from '@angular/core';
import {PlayerServiceClient} from '../../services/player.service.client';
import {ProPlayer} from '../../models/players/proplayer.model.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-playerdetails',
  templateUrl: './playerdetails.component.html',
  styleUrls: ['./playerdetails.component.css']
})
export class PlayerdetailsComponent implements OnInit {
  proPlayer: ProPlayer;
  playerId: number;

  constructor(private playerService: PlayerServiceClient,
              private route: ActivatedRoute) { }

  getPlayerDetails() {
    this.playerService.getProPlayers()
      .subscribe((result: ProPlayer[]) => {
        // console.log(result);
        // console.log(this.playerId);
        // console.log(result.find(x => x.account_id === this.playerId));
        this.proPlayer = result.find(x => x.account_id === this.playerId);
        console.log(this.proPlayer);
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playerId = Number(params['playerid']);
      this.getPlayerDetails();
    });
  }

}
