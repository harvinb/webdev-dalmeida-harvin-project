/**
 * Created by sesha on 7/26/17.
 */

import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ModuleWithProviders} from '@angular/core';
import {TestComponent} from './components/test/test.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {PlayersComponent} from './components/players/players.component';
import {PlayerdetailsComponent} from './components/playerdetails/playerdetails.component';
import {MatchesComponent} from './components/matches/matches.component';
import {LeagueListComponent} from './components/league/league-list/league-list.component';
import {LeagueNewComponent} from './components/league/league-new/league-new.component';
import {TeamListComponent} from './components/team/team-list/team-list.component';
import {HomeLeagueComponent} from './components/home/home-league/home-league.component';
import {HomeTeamComponent} from './components/home/home-team/home-team.component';
import {HomeTeamDetailsComponent} from './components/home/home-team-details/home-team-details.component';
import {HomeMatchesComponent} from './components/home/home-matches/home-matches.component';
import {AuthGuard} from './services/auth-guard.service';
import {LeagueEditComponent} from './components/league/league-edit/league-edit.component';
import {TeamNewComponent} from './components/team/team-new/team-new.component';
import {TeamEditComponent} from './components/team/team-edit/team-edit.component';
import {AdminLeagueListComponent} from './components/league/admin-league-list/admin-league-list.component';
import {AdminServiceClient} from './services/admin.service.client';
import {AdminUserCrudComponent} from './components/user/admin-user-crud/admin-user-crud.component';
import {ViewProfileComponent} from './components/user/view-profile/view-profile.component';

const APP_ROUTES: Routes = [
  {path: '',                                  component: HomeLeagueComponent},
  {path: 'leagues',                           component: HomeLeagueComponent},
  {path: 'home',                              component: HomeComponent},
  {path: 'leagues/:lid',                      component: LeagueEditComponent, canActivate: [AuthGuard]},
  {path: 'leagues/:lid/teams',                component: HomeTeamComponent},
  {path: 'matches',                           component: HomeMatchesComponent},
  {path: 'team/:tid',                         component: HomeTeamDetailsComponent},
  {path: 'project/players',                   component: PlayersComponent},
  {path: 'project/players/:playerid',         component: PlayerdetailsComponent},
  {path: 'project/matches/:teamid',           component: MatchesComponent},
  {path: 'default',                           component: LoginComponent},
  {path: 'login' ,                            component: LoginComponent},
  {path: 'register' ,                         component: RegisterComponent},
  {path: 'profile',                           component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'league/new',                        component: LeagueNewComponent, canActivate: [AuthGuard]},
  {path: 'leagues/:lid/teams/new',            component: TeamNewComponent, canActivate: [AuthGuard]},
  {path: 'leagues/:lid/ppsearch',             component: PlayersComponent, canActivate: [AuthGuard]},
  {path: 'leagues/:lid/team/:tid/ppool',      component: PlayersComponent, canActivate: [AuthGuard]},
  {path: 'leagues/:lid/team/:tid/edit',       component: TeamEditComponent, canActivate: [AuthGuard]},
  {path: 'admin/league',                      component: AdminLeagueListComponent, canActivate: [AdminServiceClient]},
  {path: 'admin/user',                        component: AdminUserCrudComponent, canActivate: [AdminServiceClient]},
  {path: 'user/:uid',                         component: ViewProfileComponent},
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
