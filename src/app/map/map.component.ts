//https://github.com/juniormayhe/angular4/tree/master/angular4-maps-agm

import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';

import { Marker } from '../marker';
import { Item } from '../item';
import { Tweet } from '../tweet';


import { EventsService } from '../events.service';
import { TweetsService } from '../tweets.service';
import { AuthenticateService} from '../authenticate.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public lat: number;
  public long: number;
  public crosslat: number;
  public crosslong: number;
  public radius: number;
  public searchControl: FormControl;
  public zoom: number;
  public formatted_address: string;
  public markers: Marker[] = [];
  public showUpdate: boolean;
  events$: Observable<Item[]>;
  tweets$: Observable<Item[]>;
  items: Item[] =[];

  @ViewChild("search")
  public searchElementRef: ElementRef;


  constructor(private tweetsService: TweetsService, private eventsService: EventsService, private authenticateService: AuthenticateService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }


  ngOnInit() {

this.showUpdate = true;

this.getAuthenticated();

    this.zoom = 14;
    this.latitude = 51.479357;
    this.longitude = -3.163203;
    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
         this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.formatted_address = place.formatted_address;

          });
  });
});


  }

markerSelected(lat, long): void {
  this.latitude = lat;
  this.longitude = long;
}

targetSelected(coords: any): void {
  this.latitude = coords.lat;
  this.longitude = coords.long;
}

onZoomChanged(zoom){
this.zoom = zoom;
}

  onBoundsChanged(bounds){

this.showUpdate = true;
    //https://stackoverflow.com/questions/3525670/radius-of-viewable-region-in-google-maps-v3
    let center = bounds.getCenter();
let ne = bounds.getNorthEast();

// r = radius of the earth in statute miles
let r = 3963.0;

this.long = center.lng();
this.lat = center.lat();
if(this.zoom === 14) {
this.crosslat = this.lat - 0.0008;
}else if(this.zoom === 15) {
this.crosslat = this.lat - 0.0004;
}
else if(this.zoom === 16) {
this.crosslat = this.lat - 0.0002;
}


// Convert lat or lng from decimal degrees into radians (divide by 57.2958)
let lat1 = this.lat / 57.2958;
let lon1 = this.long / 57.2958;
let lat2 = ne.lat() / 57.2958;
let lon2 = ne.lng() / 57.2958;

// distance = circle radius from center to Northeast corner of bounds
this.radius = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) +
  Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));

let updateMap = true;
if(this.items.length > 0){
this.updateAllDis(this.long, this.lat);
};

    }


    updateAllDis(long, lat){
      this.items.forEach((item, index) => {
          let distance = this.updateItemDis(item.long, item.lat, long, lat);
          this.items[index].distance = distance;

      })
    };

    updateItemDis(itemlong, itemlat, long, lat){
        //https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

        let R = 6371 //KM
        let dLat = (itemlat - lat) * (Math.PI/180);
        let dLon = (itemlong - long) * (Math.PI/180);
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos((itemlat)* (Math.PI/180)) * Math.cos((lat)* (Math.PI/180)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let newDis = R * c;
        return newDis;
    }


    onUpdate(){
    this.getItems(this.long, this.lat, this.radius);
    }


    getItems(lon, lat, dis): void {
    //Observable.forkJoin(this.eventsService.getEvents(lon, lat, dis), this.tweetsService.getTweets(lat, lon, dis)).subscribe(
    Observable.forkJoin(this.eventsService.getEvents(lon, lat, dis)).subscribe(
        res => {
          this.showUpdate = false;
          if(res[0]['data']['_embedded']){
                this.items = [];
            res[0]['data']['_embedded']['events'].forEach((item, index) => {
              let distance = this.updateItemDis(item._embedded.venues[0].location.longitude, item._embedded.venues[0].location.latitude, lon, lat);
              let date = new Date(item.dates.start.dateTime).toString().replace('+0000 (GMT)', '');
              this.items.push({
                title: item.name,
                date: date,
                distance: distance,
                status: item.dates.status.code,
                image: item.images[0].url,
                venue: item._embedded.venues[0].name,
                place: item._embedded.venues[0].city.name,
                lat: Number(item._embedded.venues[0].location.latitude),
                long: Number(item._embedded.venues[0].location.longitude),
                type: "event",
                marker: String("/assets/bullseye.svg")
              });
            })
          }else if(!res[0]['data']['_embedded']){
            console.log(res[0]);
          }


      /*if(res[1]['data']){
  res[1]['data']['results'].forEach((item, index) => {
    if(item.geo){
    let distance = this.updateItemDis(item.geo.coordinates[0], item.geo.coordinates[1], lat, lon);
    let date = new Date(item.created_at).toString().replace('+0000 ', '');
    console.log(date);
    this.items.push({
      date: item.created_at,
      lat: item.geo.coordinates[0],
      long: item.geo.coordinates[1],
      distance: distance,
      place: item.place.full_name,
      title: item.text,
      user_handle: item.user.screen_name,
      user_name: item.user.name,
      image: item.user.profile_image_url_https,
      user_description: item.user.description,
      type: "tweet",
      marker: "/assets/twitter.svg"
});

};
});
}else if(!res[1]['data']){
  console.log(res[1]);
}*/
    },
    err => {
        console.log(err );
    }
    );
  };


      getAuthenticated(): void {
        this.authenticateService.authenticate();
      };

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

}
