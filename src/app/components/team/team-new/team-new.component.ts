import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {TeamService} from '../../../services/team.service.client';
import {User} from '../../../models/user/user.model.client';
import {League} from '../../../models/league/league.model.client';
import {NgForm} from '@angular/forms';
import {Team} from '../../../models/team/team.model.client';

@Component({
  selector: 'app-team-new',
  templateUrl: './team-new.component.html',
  styleUrls: ['./team-new.component.css']
})
export class TeamNewComponent implements OnInit {
  user: User;
  isLoggedin: boolean;
  lId: string;

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
    });
  }

  createNewTeam(){
    const team: Team = new Team(this.teamForm.value.teamname);
    this.teamService.createTeam(this.user._id,this.lId,team).
      subscribe((response: Response) => {
      console.log(response);
      this.router.navigate(['/leagues', this.lId, 'teams']);
    });

  }

}
