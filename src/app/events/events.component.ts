import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';
import { map } from 'rxjs/operators';

import { Item } from '../item';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  //adapted from https://stackoverflow.com/questions/47248898/angular-4-simple-example-of-slide-in-out-animation-on-ngif
  animations: [
  trigger('slideInOut', [
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('200ms ease-in', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
    ])
  ])
]

})
export class EventsComponent implements OnInit {

  @Output() targetSelected = new EventEmitter<any>();
    @Input() items: Item[];

  constructor() { }

  private targetHere(lat: number, long: number): void{
    this.targetSelected.emit({lat, long});
  }

  ngOnInit() {
  }

}
