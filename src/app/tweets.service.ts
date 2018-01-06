import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TweetsService {
APIurl = 'http://localhost:3000/search';

  constructor(private http: HttpClient) { }

  getTweets(long: number, lat: number, dis: number):Observable<any> {
    console.log(long);
    let searchterm = {
      long: long,
      lat: lat,
      dis: dis
    }
    return this.http.post(this.APIurl, searchterm, httpOptions)
    };

}
