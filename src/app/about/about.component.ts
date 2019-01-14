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
import {concatAll, delayWhen, filter, map, mapTo, mergeMap, take, timeout} from 'rxjs/operators';
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
  mouseX: any;
  mouseY: any;
  subscription: Subscription;
  mergeSubscription: Subscription;

  constructor() {
  }

  /** Forkify Food API
   *  `${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`;
   *  export const proxy = 'https://cors-anywhere.herokuapp.com/';
   *  export const key = '6e7d1abc5692eb188256bf21d3527f37';
   */

  /** Weather API key
   * const weatherkey = 'fbf1257adcb5a5b49f7a3088dba2ae81';
   * api.openweathermap.org/data/2.5/weather?APPID=${weatherkey}
   */

  /**const proxy = 'https://cors-anywhere.herokuapp.com/';
   const key = '6e7d1abc5692eb188256bf21d3527f37';
   */
  ngOnInit() {

    const clickInDocument$ = fromEvent(document, 'click');
    this.subscription = clickInDocument$.subscribe((clickData: any) => {
      this.mouseX = clickData.clientX;
      this.mouseY = clickData.clientY;
    });


    const http$ = createHttpObservable('api/courses');

    const courses$ = http$.pipe(map((res) => {
      Object.values(res['payload']);
    }));

    courses$.subscribe((courses) => {
      console.log(courses),
        noop(),
        () => console.log('Completed...!!!');
    });

    /**
     * MergeMap practice below
     */
    // const interval1$ = interval(1000);
    // const interval2$ = interval1$.pipe(map(value => value * 10));
    // const output = merge(interval1$, interval2$);
    // this.mergeSubscription = output.subscribe((value) => {
    //   console.log(value);
    // });


    const int1$ = interval(1000);
    this.mergeSubscription = int1$.subscribe((value) => {
      console.log(value);
      if (value >= 10) {
        this.mergeSubscription.unsubscribe();
      }
    });
    
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.mergeSubscription.unsubscribe();
  }


}


