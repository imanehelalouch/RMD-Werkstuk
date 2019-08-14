import {Component, Input, OnInit} from '@angular/core';
import {Planet} from '../../../model/planet';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {
  @Input() selectedPlanet: Planet;
  constructor() { }

  ngOnInit() {
  }

  visitPlanet(planet: Planet){
    // add planet in fleet in firestore
  }

}
