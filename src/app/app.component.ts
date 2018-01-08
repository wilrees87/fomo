import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public innerWidth: any;
  public innerHeight: any;

  title = 'FOMO Live';


  constructor() { }

//get window dimension on initialisation and watch for changes
  ngOnInit() {
    this.innerWidth = window.innerWidth - 40; //create margin
    this.innerHeight = window.innerHeight - 100; //create margin
  }

  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    this.innerWidth = window.innerWidth - 40; //create margin
    this.innerHeight = window.innerHeight - 100; //create margin
  }

}
