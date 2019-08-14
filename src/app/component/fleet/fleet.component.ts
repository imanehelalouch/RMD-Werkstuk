import { Component, OnInit } from '@angular/core';
import { Pilot } from 'src/app/model/pilot';
import { Starship } from 'src/app/model/starship';
import { StarshipService } from 'src/app/service/starship.service';
import { PilotService } from 'src/app/service/pilot.service';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit {
  pilot: Pilot;
  searchName: String;
  searchedStarships: Starship[] = [];
  selectedStarships: Starship[] = [];
  changeText: boolean = true;



  constructor(private starshipService: StarshipService, private pilotService: PilotService) {
  }

  searchStarship() {
    this.searchedStarships = [];
    this.starshipService.searchByName(this.searchName).subscribe(
      (response: any) => {
        if (response.results.length > 0) {
          response.results.forEach(starship => {
            const initStarship: Starship = { 'name': starship.name, 'model': starship.model,
              'manufacturer': starship.manufacturer, 'consumables': starship.consumables, 'passengers': starship.passengers, 'pilots': [] };
            if (starship.pilots.length > 0) {
              starship.pilots.forEach(pilot => {
                this.pilotService.getPilotByUrl(pilot).subscribe(
                  (responsePilot: Pilot) => {
                    initStarship.pilots.push(responsePilot);
                  }
                );
              });
            }
            this.searchedStarships.push(initStarship);
          });
        }

      },
      (error) => {
        console.log(error);
      }
    )

  }

  resetSearchList() {
    this.searchedStarships =  [];
    this.searchName = '';

  }

  selectStarship(starship: Starship) {
    this.selectedStarships.push(starship);
  }

  removeStartship(starship: Starship) {
    const indexOfStarship = this.selectedStarships.indexOf(starship);
    if (indexOfStarship > -1) {
      this.selectedStarships.splice(indexOfStarship, 1);
    }
  }

  save() {
    // Save in Google Firestore
  }

  ngOnInit() {
  }


}
