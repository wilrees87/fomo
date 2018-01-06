import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';
import { TweetsService} from './tweets.service';
import { AuthenticateService} from './authenticate.service';
import { EventsService} from './events.service';
import { ItemsService} from './items.service';
import { MapComponent } from './map/map.component';
import { EventsComponent } from './events/events.component';

import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { DistancePipe } from './distance.pipe';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    EventsComponent,
    DistancePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDDEW9pD0K6S3orttT4k_xhLmg1mM9PQgI',
      libraries: ["places"]
    }),
    AgmJsMarkerClustererModule,
    HttpClientModule
  ],
  providers: [TweetsService, AuthenticateService, EventsService, ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
