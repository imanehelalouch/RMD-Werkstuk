import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {
  apiBase = 'https://swapi.co/api/';
  apiSearch = 'https://swapi.co/api/starships/?search=';
  apiStarships = 'https://swapi.co/api/starships/';

  constructor(private httpClient: HttpClient) {
  }

  searchByName(name: String) {
    return this.httpClient.get(this.apiSearch + name);
  }

  getAll() {
    return this.httpClient.get(this.apiStarships);
  }
}
