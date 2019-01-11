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
  ReplaySubject, Subscription
} from 'rxjs';
import {concatAll, delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import {Time} from '@angular/common';
import * as _ from 'lodash';

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
  fromeventSubscription: Subscription;
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
      if (this.counter > 11) {
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
      if (this.concatAllData === 11) {
        this.conSubscription.unsubscribe();
      }
    });

    const clickInDocument$ = fromEvent(document, 'mouseover');
    this.fromeventSubscription = clickInDocument$.subscribe((clickData: any) => {
      this.mouseX = clickData.clientX;
      this.mouseY = clickData.clientY;
      if((this.mouseX && this.mouseY) > 400) {
        this.fromeventSubscription.unsubscribe();
      }
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.conSubscription.unsubscribe();
  }


}


