import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/service/people.service';
import { People } from 'src/app/model/people';
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
