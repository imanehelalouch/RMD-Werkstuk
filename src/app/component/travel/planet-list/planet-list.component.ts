import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlanetService} from '../../../service/planet.service';
import {Planet} from '../../../model/planet';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {
  @Output() planetSelected = new EventEmitter<Planet>();
  private  allPlanets: Planet[];
  // planetSelected = new EventEmitter<Planet>();

  constructor(private planetService: PlanetService) {
  this.getAllPlanets();
  }

  ngOnInit() {
  }

  getAllPlanets() {
    this.planetService.getAllPlanets().subscribe(
      (response: any) => {
        if (response.results.length > 0) {
          this.allPlanets = response.results;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectPlanet(clickedPlanet: Planet) {
    this.planetSelected.emit(clickedPlanet);
  }


}
