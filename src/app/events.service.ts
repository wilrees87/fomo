import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EventsService {

  // server side function (hosted at heroku) used to protect tokens, keys and secrets
  APIurl1 = 'https://immense-scrubland-79733.herokuapp.com/events';
  APIurl2 = 'https://immense-scrubland-79733.herokuapp.com/more-events';


  constructor(private http: HttpClient) { }
  getEvents(lon: number, lat: number, dis: number): Observable<any> {
    const searchterm = {
      lon: lon,
      lat: lat,
      dis: dis
    };
    return this.http.post(this.APIurl1, searchterm, httpOptions);
  }

  getMoreEvents(url: string): Observable<any> {
    const searchterm = { url: url };
    return this.http.post(this.APIurl2, searchterm, httpOptions);
  }
}
