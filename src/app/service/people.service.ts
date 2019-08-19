import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  constructor(private http: HttpClient) { }


  getPilotByUrl(pilotURL) {
    return this.http.get(pilotURL);
  }




}
