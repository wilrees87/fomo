import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { map } from 'rxjs/operators';

import { Item } from '../item';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],

  // adapted from https://stackoverflow.com/questions/47248898/angular-4-simple-example-of-slide-in-out-animation-on-ngif
  // slides in from left
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    // slides up from below
    trigger('slideDownOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]

})
export class EventsComponent implements OnInit {

  @Output() targetSelected = new EventEmitter<any>();
  @Input() items: Item[];

  public innerWidth: number;
  public innerHeight: number;
  public minMax: boolean;

  constructor() { }

  private targetHere(lat: number, long: number): void {
    this.targetSelected.emit({ lat, long });
  }

  private minMaxSwitch(): void {
    this.minMax = !this.minMax;
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth - 40; // -40 to be consistent and maintain margin
    this.innerHeight = window.innerHeight - 100; // -100 to be consistent and maintain margin
  }

  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    this.innerWidth = window.innerWidth - 40; // -40 to be consistent and maintain margin
    this.innerHeight = window.innerHeight - 100; // -100 to be consistent and maintain margin
  }

}
