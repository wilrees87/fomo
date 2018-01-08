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


  ngOnInit() {
    this.innerWidth = window.innerWidth - 40;
    this.innerHeight = window.innerHeight - 100;
  }

  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    this.innerWidth = window.innerWidth - 40;
    this.innerHeight = window.innerHeight - 100;
}

}
