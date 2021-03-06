import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import {Routing} from './app.routing';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { QuillEditorModule } from 'ngx-quill-editor';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';

import {UserService} from './services/user.service.client';
import { PlayersComponent } from './components/players/players.component';
import { MatchesComponent } from './components/matches/matches.component';
import {PlayerServiceClient} from './services/player.service.client';
import {PlayerdetailsComponent} from './components/playerdetails/playerdetails.component';
import {MatchServiceClient} from './services/match.service.client';
import { LeagueListComponent } from './components/league/league-list/league-list.component';
import { LeagueNewComponent } from './components/league/league-new/league-new.component';
import { LeagueEditComponent } from './components/league/league-edit/league-edit.component';
import {LeagueService} from './services/league.service.client';
import { TeamListComponent } from './components/team/team-list/team-list.component';
import {TeamService} from './services/team.service.client';
import { TeamNewComponent } from './components/team/team-new/team-new.component';
import { TeamEditComponent } from './components/team/team-edit/team-edit.component';
import { HomeLeagueComponent } from './components/home/home-league/home-league.component';
import { HomeTeamComponent } from './components/home/home-team/home-team.component';
import { HomeTeamDetailsComponent } from './components/home/home-team-details/home-team-details.component';
import { HomeMatchesComponent } from './components/home/home-matches/home-matches.component';
import {SharedService} from './services/shared.service';
import {AuthGuard} from './services/auth-guard.service';
import { AdminLeagueListComponent } from './components/league/admin-league-list/admin-league-list.component';
import {AdminServiceClient} from './services/admin.service.client';
import { AdminUserCrudComponent } from './components/user/admin-user-crud/admin-user-crud.component';
import { ViewProfileComponent } from './components/user/view-profile/view-profile.component';
import {CommentServiceClient} from './services/comment.service.client';


@NgModule({
  // Declare components here
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    PlayersComponent,
    MatchesComponent,
    PlayerdetailsComponent,
    LeagueListComponent,
    LeagueNewComponent,
    LeagueEditComponent,
    TeamListComponent,
    TeamNewComponent,
    TeamEditComponent,
    HomeLeagueComponent,
    HomeTeamComponent,
    HomeTeamDetailsComponent,
    HomeMatchesComponent,
    AdminLeagueListComponent,
    AdminUserCrudComponent,
    ViewProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    QuillEditorModule,
    Routing
  ],
  // Client Side services here
  providers: [UserService, LeagueService, TeamService, PlayerServiceClient, MatchServiceClient,
              SharedService, AuthGuard, AdminServiceClient, CommentServiceClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
