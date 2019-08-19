import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavigationComponent} from './component/navigation/navigation.component';
import {TravelComponent} from './component/travel/travel.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FleetComponent} from './component/fleet/fleet.component';
import {FormsModule} from '@angular/forms';
import {PeopleService} from './service/people.service';
import {StarshipService} from './service/starship.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PlanetListComponent} from './component/travel/planet-list/planet-list.component';
import {PlanetDetailsComponent} from './component/travel/planet-details/planet-details.component';
import {environment} from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FleetComponent,
    TravelComponent,
    PlanetListComponent,
    PlanetDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    RouterModule.forRoot([
        {
          path: 'fleet-component',
          component: FleetComponent
        },
        {
          path: 'travel-component',
          component: TravelComponent
        }])


  ],
  providers: [PeopleService, StarshipService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
