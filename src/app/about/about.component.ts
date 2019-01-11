import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  concat,
  fromEvent,
  interval,
  noop,
  observable,
  Observable,
  of,
  timer,
  merge,
  Subject,
  BehaviorSubject,
  AsyncSubject,
  ReplaySubject, Subscription, Observer
} from 'rxjs';
import {concatAll, delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import {Time} from '@angular/common';
import * as _ from 'lodash';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  iClick: any;
  counter: any = 0;
  concatAllData: number = 0;
  mouseX: any;
  mouseY: any;
  subscription: Subscription;
  conSubscription: Subscription;
  fromEventSubscription: Subscription;
  constructor() {

  }

  ngOnInit() {
    // document.addEventListener('click', evt => {
    //   if (evt.clientX > 500) {
    //     this.iClick = 'Less then 500';
    //   } else {
    //     this.iClick = evt.clientX;
    //   }
    // });
    //
    // setInterval(() => {
    //   console.log(this.counter.toString());
    //  this.counter++;
    // }, 500);
    //
    // setTimeout(() => {
    //   console.log('Finished...');
    // }, 1500);

    const int = interval(1000);
    this.subscription = int.subscribe((value) => {
      this.counter = value;
      console.log(value);
      if (this.counter >= 2) {
        this.subscription.unsubscribe();
      }
    });

    const concatAll$ = int.pipe(
      map(value => of(value + 10)),
      concatAll()
    );

    this.conSubscription = concatAll$.subscribe((data) => {
      this.concatAllData = data;
      console.log(data);
      if (this.concatAllData >= 11) {
        this.conSubscription.unsubscribe();
      }
    });

    const clickInDocument$ = fromEvent(document, 'click');
    this.fromEventSubscription = clickInDocument$.subscribe((clickData: any) => {
      this.mouseX = clickData.clientX;
      this.mouseY = clickData.clientY;
    });


    const http$ = Observable.create((observer) => {
      fetch('/api/courses').then((response) => {
       return response.json();
     }).then((body) => {
       observer.next(body);
       observer.complete();
     }).catch((err) => {
       observer.error(err);
     });
    });

    http$.subscribe(data => {
      console.log(data),
        noop(),
        () => console.log('completed');
    });
    
    /** Forkify Food API
     *  `${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`;
     *  export const proxy = 'https://cors-anywhere.herokuapp.com/';
     *  export const key = '6e7d1abc5692eb188256bf21d3527f37';
     */

    /** Weather API key
     * const weatherkey = 'fbf1257adcb5a5b49f7a3088dba2ae81';
     * api.openweathermap.org/data/2.5/weather?APPID=${weatherkey}
     */

    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '6e7d1abc5692eb188256bf21d3527f37';

    const fetchFood = Observable.create((observer) => {
       fetch(`${proxy}http://food2fork.com/api/search?key=${key}`).then((response) => {

        return response.json();
      }).then((body) => {
        observer.next(body);
        observer.complete();
      }).catch((err) => {
        observer.error(err);
      });
    });

    fetchFood.subscribe(data => {
      console.log(data),
        noop(),
        () => console.log('Fetching data Completed.....');
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.conSubscription.unsubscribe();
    this.fromEventSubscription.unsubscribe();
  }


}


