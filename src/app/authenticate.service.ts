import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/X-www-form-urlencoded' })
};

@Injectable()
export class AuthenticateService {

  APIurl = 'http://localhost:3000/authorize';

  constructor(private http: HttpClient) { }

  authenticate() {
    return this.http.post(this.APIurl, httpOptions).subscribe(suc => {
      console.log(suc);
    },
      err => {
        console.log(err);
      });
  }
}
