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

const APP_ROUTES: Routes = [
  {path: '',                                              component: HomeLeagueComponent},
  {path: 'leagues',                                       component: HomeLeagueComponent},
  {path: 'leagues/:lid/teams',                            component: HomeTeamComponent},
  {path: 'matches',                                       component: HomeMatchesComponent},
  {path: 'team/:tid',                                     component: HomeTeamDetailsComponent},
  {path: 'project/players',                               component: PlayersComponent},
  {path: 'project/players/:playerid',                     component: PlayerdetailsComponent},
  {path: 'project/matches/:teamid',                       component: MatchesComponent},
  {path: 'default',                                       component: LoginComponent},
  {path: 'login' ,                                        component: LoginComponent},
  {path: 'register' ,                                     component: RegisterComponent},
  {path: 'user/:uid',                                     component: ProfileComponent},
  {path: 'user/:uid/league',                              component: LeagueListComponent},
  {path: 'user/:uid/league/new',                          component: LeagueNewComponent},
  {path: 'user/:uid/league/:lid/team',                    component: TeamListComponent}
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
