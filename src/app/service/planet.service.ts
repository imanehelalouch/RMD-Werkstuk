import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  apiPlanets = 'https://swapi.co/api/planets/';

  constructor(private http: HttpClient) { }

  getAllPlanets() {
    return this.http.get(this.apiPlanets);
  }
}
