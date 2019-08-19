import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlanetService} from '../../../service/planet.service';
import {Planet} from '../../../model/planet';
import {Fleet} from '../../../model/fleet';
import {FleetService} from '../../../service/fleet.service';
import {PeopleService} from '../../../service/people.service';
import {People} from '../../../model/people';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {
  @Output() planetSelected = new EventEmitter<Planet>();
  private allPlanets: Planet[];
  private planetList: Planet = new Planet();
  private isLoading = false;
  // planetSelected = new EventEmitter<Planet>();

  private myFleet: Fleet = new Fleet();

  constructor(private planetService: PlanetService, private fleetService: FleetService, private peopleService: PeopleService) {
    this.getAllPlanets();
    this.loadFleet();
  }


  loadFleet() {
    this.fleetService
      .getFleets()
      .subscribe(res => (this.myFleet = this.transformFirestoreFleetToCustom(res)));
  }


  transformFirestoreFleetToCustom(data): Fleet {
    if (data.length > 0) {
      this.myFleet.id = data[0].payload.doc.id;
      // console.log('my payload id : ' + data[0].payload.doc.id);
      const correctFleet = data[0].payload.doc.data();
      correctFleet.id = data[0].payload.doc.id;
      console.log();
      return correctFleet;
    } else {
      const newFleet = new Fleet();
      newFleet.name = 'Please select a fleet name';
      return newFleet;
    }
  }

  hasBeenVisited(planet: Planet): boolean {
    const indexPlanet = this.myFleet.planets.map(x => x.name).indexOf(planet.name);
    if (indexPlanet !== -1) {
      return true;
    } else {
      return false;
    }
  }

  visitPlanet(planet: Planet) {
    if (!this.hasBeenVisited(planet)) {
      this.myFleet.planets.push(planet);
      this.updateFleet();
    }

  }

  updateFleet() {
    // console.log(this.myFleet);
    const data: Object = JSON.parse(JSON.stringify(this.myFleet));
    this.fleetService.updateFleet(data);
  }

  ngOnInit() {
  }

  getAllPlanets() {
    this.isLoading = true;
    this.planetService.getAllPlanets().subscribe(
      (response: any) => {
        if (response.results.length > 0) {
          this.allPlanets = response.results;
          // console.log(this.allPlanets);
        }
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  selectPlanet(clickedPlanet: Planet) {
    const myResidents: People[] = [];
    const copyPlanet: Planet = Object.assign({}, clickedPlanet);
    clickedPlanet.residents.forEach(people => {
      this.peopleService.getPilotByUrl(people).subscribe(
        (response: People) => {
          myResidents.push(response);
        },
        (error) => {
          console.log(error);
        }
      );
    });
    copyPlanet.residents = myResidents;
    this.planetSelected.emit(copyPlanet);
  }

}
