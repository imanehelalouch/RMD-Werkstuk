import { Component, OnInit } from '@angular/core';
import { PilotService } from 'src/app/service/pilot.service';
import { Pilot } from 'src/app/model/pilot';
import {Planet} from '../../model/planet';


@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  private selectedPlanet: Planet;


  constructor() {

  }

  ngOnInit() {
  }

  planetSelected(planet: Planet){
    this.selectedPlanet = planet;
  }


}
