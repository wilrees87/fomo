import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EventsService {
  APIurl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) { }

  getEvents(lon: number, lat: number, dis: number): Observable<any> {
    const searchterm = {
      lon: lon,
      lat: lat,
      dis: dis
    };
    return this.http.post(this.APIurl, searchterm, httpOptions);
  }
}
