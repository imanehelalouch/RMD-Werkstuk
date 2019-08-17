import {Component, OnInit} from '@angular/core';
import {Pilot} from 'src/app/model/pilot';
import {Starship} from 'src/app/model/starship';
import {StarshipService} from 'src/app/service/starship.service';
import {PilotService} from 'src/app/service/pilot.service';
import {Fleet} from '../../model/fleet';
import {FleetService} from '../../service/fleet.service';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit {
  pilot: Pilot;
  searchName: String;
  searchedStarships: Starship[] = [];
  changeText = true;
  myFleet: Fleet = new Fleet();
  private isLoading = false;


  constructor(private starshipService: StarshipService, private pilotService: PilotService, private fleetService: FleetService) {
    this.myFleet.name = 'Test fleet';
    this.loadFleet();
    this.getAllStarships();
  }

  getAllStarships() {
    this.isLoading = true;
    this.searchedStarships = [];
    this.starshipService.getAll().subscribe(
      (response: any) => {
        if (response.results.length > 0) {
          response.results.forEach(starship => {
            this.isLoading = false;
            const initStarship: Starship = {
              'name': starship.name, 'model': starship.model,
              'manufacturer': starship.manufacturer, 'consumables': starship.consumables, 'passengers': starship.passengers, 'pilots': []
            };
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
        this.isLoading = false;
      }
    );
  }

  searchStarship() {
    this.searchedStarships = [];
    this.starshipService.searchByName(this.searchName).subscribe(
      (response: any) => {
        if (response.results.length > 0) {
          response.results.forEach(starship => {
            const initStarship: Starship = {
              'name': starship.name, 'model': starship.model,
              'manufacturer': starship.manufacturer, 'consumables': starship.consumables, 'passengers': starship.passengers, 'pilots': []
            };
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
    );

  }

  resetSearchList() {
    this.searchedStarships = [];
    this.searchName = '';
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
      newFleet.name = 'Fleet name';
      return newFleet;
    }
  }


  selectStarship(starship: Starship) {
    this.myFleet.starships.push(starship);
  }

  removeStartship(starship: Starship) {
    const indexOfStarship = this.myFleet.starships.indexOf(starship);
    if (indexOfStarship > -1) {
      this.myFleet.starships.splice(indexOfStarship, 1);
    }
  }

  createOrSaveFleet() {
    if (this.myFleet.id === undefined) {
      this.save();
    } else {
      this.update();
    }
  }

  save() {
    console.log(this.myFleet);
    // Save in Google Firestore
    const data: Object = JSON.parse(JSON.stringify(this.myFleet));
    this.fleetService.createFleet(data)
      .then(res => {

      });
  }

  update() {
    console.log(this.myFleet);
    const data: Object = JSON.parse(JSON.stringify(this.myFleet));
    this.fleetService.updateFleet(data);
  }

  delete() {
    this.fleetService.deleteCoffeeOrder(this.myFleet);
  }

  ngOnInit() {
  }


}
