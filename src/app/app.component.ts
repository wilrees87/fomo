import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public innerWidth: any;
  public innerHeight: any;

 title: string = "FOMO Live";


  constructor() { }


  ngOnInit() {
    this.innerWidth = window.innerWidth - 40;
    this.innerHeight = window.innerHeight - 100;
  }

  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth - 60;
  this.innerHeight = window.innerHeight - 100;
}

}
