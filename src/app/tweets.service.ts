import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TweetsService {

  // server side function (hosted at heroku) used to protect tokens, keys and secrets
  APIurl = 'https://immense-scrubland-79733.herokuapp.com/search';

  constructor(private http: HttpClient) { }

  getTweets(long: number, lat: number, dis: number): Observable<any> {
    const searchterm = {
      long: long,
      lat: lat,
      dis: dis
    };
    return this.http.post(this.APIurl, searchterm, httpOptions);
  }

}
