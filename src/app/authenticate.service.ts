import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/X-www-form-urlencoded' })
};

@Injectable()
export class AuthenticateService {

  // server side function (hosted at heroku) used to protect tokens, keys and secrets
  APIurl = 'https://immense-scrubland-79733.herokuapp.com/authorize';

  constructor(private http: HttpClient) { }

  authenticate() {
    return this.http.post(this.APIurl, httpOptions).subscribe(suc => {
      console.log("Welcome to FOMO Live"); //auth message
    },
      err => {
        console.log(err);
      });
  }
}
