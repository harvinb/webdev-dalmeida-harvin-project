import { Component, OnInit } from '@angular/core';
import {PlayerServiceClient} from '../../services/player.service.client';
import {ProPlayer} from '../../models/players/proplayer.model.client';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  playerName: string;
  playerList: ProPlayer[];
/*
  getProPlayerList() {

    this.playerService.getProPlayers()
      .subscribe((result) => {
        console.log(result);

        return result.filter(function (proPlayer: ProPlayer) {
          return (proPlayer.is_pro === true && proPlayer.is_locked === true);
        });
      });
  }
*/
  searchPlayer() {
    //let pList: Player[];
    //let proList: ProPlayer[];

    this.playerService.getProPlayers()
      .subscribe((presult) => {
        console.log(presult);
        console.log(this.playerName);
        const pName = this.playerName;

        this.playerList = presult.filter(function (proPlayer: ProPlayer) {
          return (proPlayer.is_pro === true &&
            proPlayer.is_locked === true &&
            proPlayer.name.toLowerCase().includes(pName));
        });
        console.log(this.playerList);
    });

  }

  constructor(private playerService: PlayerServiceClient) { }

  ngOnInit() {
  }

}
