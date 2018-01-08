import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/X-www-form-urlencoded' })
};

@Injectable()
export class AuthenticateService {

  APIurl = 'https://immense-scrubland-79733.herokuapp.com/authorize';
//APIurl = 'http://localhost:8080/authorize';

  constructor(private http: HttpClient) { }

  authenticate() {
    return this.http.post(this.APIurl, httpOptions).subscribe(suc => {
      console.log("Welcome to FOMO Live");
    },
      err => {
        console.log(err);
      });
  }
}
