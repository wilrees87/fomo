import { Injectable } from '@angular/core';

import { EventsService } from './events.service';
import { TweetsService} from './tweets.service';
import { AuthenticateService} from './authenticate.service';

import { Item } from './item';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ItemsService {

  items: Observable<Item[]>;
  tempevents: Item[] = [];
  temptweets: Item[] = [];

  constructor(private eventsService: EventsService, private tweetsService: TweetsService, private authenticateService: AuthenticateService) { }


  getEvents(lon, lat, dis) {
    this.eventsService.getEvents(lon, lat, dis).subscribe(
      res => {

              res['data']['_embedded']['events'].forEach((item, index) => {
                var distance = this.updateItemDis(item._embedded.venues[0].location.longitude, item._embedded.venues[0].location.latitude, lon, lat);
                this.tempevents.push({
                  title: item.name,
                  date: item.dates.start.dateTime,
                  distance: distance,
                  status: item.dates.status.code,
                  image: item.images[0].url,
                  venue: item._embedded.venues[0].name,
                  place: item._embedded.venues[0].city.name,
                  lat: item._embedded.venues[0].location.latitude,
                  long: item._embedded.venues[0].location.longitude,
                  type: "event",
                  marker: "/assets/bullhorn.svg"
                });
              })
          },
          err => {
              console.log(err );
          }
        );
  }

  getTweets(lat, long, dis) {
    this.tweetsService.getTweets(lat, long, dis).subscribe(
      res => {
        res['data']['results'].forEach((item, index) => {
          this.temptweets = [];
          if(item.geo){
          var distance = this.updateItemDis(item.geo.coordinates[0], item.geo.coordinates[1], lat, long);
          this.temptweets.push({
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
},
      err => {
        console.log(err)
      });
  };

  updateItemDis(itemlong, itemlat, long, lat){
      //https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

      var R = 6371 //KM
      var dLat = (itemlat - lat) * (Math.PI/180);
      var dLon = (itemlong - long) * (Math.PI/180);
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos((itemlat)* (Math.PI/180)) * Math.cos((lat)* (Math.PI/180)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var newDis = R * c;
      return newDis;
  }


}
