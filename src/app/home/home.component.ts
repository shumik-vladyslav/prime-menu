import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {TreeTableModule,TreeNode,SharedModule} from 'primeng/primeng';
import {Message} from "primeng/components/common/api";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  msgs: Message[];

  broker: TreeNode[];

  city: TreeNode[];

  client: TreeNode[];

  event: TreeNode[];

  market: TreeNode[];

  venue: TreeNode[];

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get("../app/json/broker-search.json").subscribe((data) => {
      this.broker = data.json();
      this.setData(this.broker, 4, "brokerName", "", "stateName", "cityName", "stateNameShort");
    });
    this.http.get("../app/json/city-search.json").subscribe((data) => {
      this.city = data.json();
      this.setData(this.city, 2, "cityName", "", "stateName", "cityName", "stateNameShort");
    });
    this.http.get("../app/json/client-search.json").subscribe((data) => {
      this.client = data.json();
      this.setData(this.client, 3, "cityName", "address", "stateName", "cityName", "stateNameShort", "firstName", "lastName");
    });
    this.http.get("../app/json/event-search.json").subscribe((data) => {
      this.event = data.json();
      this.setData(this.event, 0, "eventName", "dateTime", "venueName", "cityName", "stateNameShort");
    });
    this.http.get("../app/json/market-place-search.json").subscribe((data) => {
      this.market = data.json();
      this.setData(this.market, 5, "marketPlaceName", "", "stateName", "cityName", "stateNameShort");
    });
    this.http.get("../app/json/venue-search.json").subscribe((data) => {
      this.venue = data.json();
      this.setData(this.venue, 1, "venueName", "", "stateName", "cityName", "stateNameShort");
    });
  }

  search(name){
    this.setData(this.broker, 4, "brokerName", "", "stateName", "cityName", "stateNameShort");
    this.setData(this.city, 2, "cityName", "", "stateName", "cityName", "stateNameShort");
    this.setData(this.client, 3, "cityName", "address", "stateName", "cityName", "stateNameShort", "firstName", "lastName");
    this.setData(this.event, 0, "eventName", "dateTime", "venueName", "cityName", "stateNameShort");
    this.setData(this.market, 5, "marketPlaceName", "", "stateName", "cityName", "stateNameShort");
    this.setData(this.venue, 1, "venueName", "", "stateName", "cityName", "stateNameShort");

    for(let key in this.data){
      this.data[key]["children"] = this.data[key]["children"].filter(chield => {
        console.log(chield.data.eventName,chield,name)
        if(chield.data.eventName && name)
          return chield.data.eventName.toLowerCase().indexOf(name.toLowerCase()) !== -1;
        else
          return true;
      });
    }

  }

  setData(data, index, eventName, dateTime, venueName, cityName, stateNameShort, firstName?, lastName?){
    let children = [];
    for(let item of data){
      children.push({
        "data":{
          "eventName": item[eventName],
          "dateTime": item[dateTime],
          "venueName": item[venueName],
          "cityName": item[cityName],
          "stateNameShort": item[stateNameShort],
          "firstName": item[firstName],
          "lastName": item[lastName],
        }});
    }
    this.data[index]["children"] = children;
  }

  searchModel;

  data = [
    {
      "data":{
        "eventName":"Events",
        "dateTime":"",
        "venueName":"",
        "cityName":"",
        "stateNameShort":"",
      },
      "children":[]
    },
    {
      "data":{
        "eventName":"Veneus",
        "dateTime":"",
        "venueName":"",
        "cityName":"",
        "stateNameShort":"",
      },
      "children":[]
    },
    {
      "data":{
        "eventName":"Cities",
        "dateTime":"",
        "venueName":"",
        "cityName":"",
        "stateNameShort":"",
      },
      "children":[]
    },
    {
      "data":{
        "eventName":"Clients",
        "dateTime":"",
        "venueName":"",
        "cityName":"",
        "stateNameShort":"",
      },
      "children":[]
    },
    {
      "data":{
        "eventName":"Brokers",
        "dateTime":"",
        "venueName":"",
        "cityName":"",
        "stateNameShort":"",
      },
      "children":[]
    },
    {
      "data":{
        "eventName":"Market Places",
        "dateTime":"",
        "venueName":"",
        "cityName":"",
        "stateNameShort":"",
      },
      "children":[]
    }
  ]

}
