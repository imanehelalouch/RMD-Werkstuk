import {Component, Input, OnInit} from '@angular/core';
import {Planet} from '../../../model/planet';
import {FleetService} from '../../../service/fleet.service';
import {Fleet} from '../../../model/fleet';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {
  @Input() selectedPlanet: Planet;
  private myFleet: Fleet = new Fleet();

  constructor(private fleetService: FleetService) {
    this.loadFleet();
  }

  ngOnInit() {
  }



  loadFleet() {
    this.fleetService
      .getFleets()
      .subscribe(res => (this.myFleet = this.transformFirestoreFleetToCustom(res)));
  }


  transformFirestoreFleetToCustom(data): Fleet {
    if (data.length > 0) {
      this.myFleet.id = data[0].payload.doc.id;
      console.log('my payload id : ' + data[0].payload.doc.id);
      let correctFleet = data[0].payload.doc.data();
      correctFleet.id = data[0].payload.doc.id;
      console.log();
      return correctFleet;
    } else {
      let newFleet = new Fleet();
      newFleet.name = 'Please select a fleet name';
      return newFleet;
    }
  }

  hasBeeenVisited(planet: Planet): boolean {
    const indexPlanet = this.myFleet.planets.map(x => x.name).indexOf(planet.name);
    if (indexPlanet !== -1) {
      return true;
    } else {
      return false;
    }
  }

  visitPlanet(planet: Planet) {
    if (!this.hasBeeenVisited(planet)) {
      this.myFleet.planets.push(planet);
      this.updateFleet();
    }

  }

  updateFleet() {
    console.log(this.myFleet);
    const data: Object = JSON.parse(JSON.stringify(this.myFleet));
    this.fleetService.updateFleet(data);
  }


}
