import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { TravelComponent } from './component/travel/travel.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { FleetComponent } from './component/fleet/fleet.component';
import {FormsModule} from '@angular/forms';
import { PilotService } from './service/pilot.service';
import { StarshipService } from './service/starship.service';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { ViewportScroller } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FleetComponent,
    TravelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
        {
          path: 'fleet-component',
          component: FleetComponent
        },
      {
        path: 'travel-component',
        component: TravelComponent
      }],
      { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})


  ],
  providers: [PilotService, StarshipService],
  bootstrap: [AppComponent]
})
export class AppModule { }
