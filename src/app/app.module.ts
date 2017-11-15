import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import {Routing} from './app.routing';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';

import {UserService} from './services/user.service.client';
import { PlayersComponent } from './project/components/players/players.component';
import { MatchesComponent } from './project/components/matches/matches.component';
import {PlayerServiceClient} from './project/services/player.service.client';
import {PlayerdetailsComponent} from './project/components/playerdetails/playerdetails.component';
import {MatchServiceClient} from './project/services/match.service.client';

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
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing
  ],
  // Client Side services here
  providers: [UserService, PlayerServiceClient, MatchServiceClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
