import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pilot } from '../model/pilot';

@Injectable({
  providedIn: 'root'
})
export class PilotService {
  apiBase = 'https://swapi.co/api/';
  apiSearch = 'https://swapi.co/api/starships/?search=';
  apiPeopleID = 'https://swapi.co/api/people/';
  constructor(private http: HttpClient) { }



  getPilot(pilotID) {
    return this.http.get(this.apiPeopleID + pilotID);
  }

  getPilotByUrl(pilotURL) {
    return this.http.get(pilotURL);
  }




}
