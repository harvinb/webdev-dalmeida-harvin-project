import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user/user.model.client';
import {NgForm} from '@angular/forms';
import {TeamService} from '../../../services/team.service.client';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Team} from '../../../models/team/team.model.client';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  user: User;
  isLoggedin: boolean;
  lId: string;
  tId: string;
  team: Team;

  @ViewChild('f') teamForm: NgForm;

  constructor(private teamService: TeamService,
              private sharedService: SharedService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.sharedService.user || null;
    this.isLoggedin = false;
    if (this.user !== null) {
      this.isLoggedin = true;
    }
    this.route.params.subscribe(params => {
      this.lId = params['lid'];
      this.tId = params['tid'];
      this.teamService.findTeamById(this.tId).
        subscribe((cteam: Team) => {
        this.team = cteam;
      })
    });
  }

  updateTeam(){
    this.teamService.updateTeam(this.tId, this.team).
    subscribe((response: Response) => {
      console.log(response);
      this.router.navigate(['/leagues', this.lId, 'teams']);
    });

  }

}
