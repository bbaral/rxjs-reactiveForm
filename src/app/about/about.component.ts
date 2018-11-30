import {Component, OnInit} from '@angular/core';
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
  ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import {Time} from '@angular/common';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses');
    const courses$ = http$.pipe(
      map(res => Object.values(res["payload"])));

    // http$.subscribe(
    //   courses => console.log(courses),
    //   noop(), // noop == no operation
    //   () => console.log('Completed')
    // );

    courses$.subscribe(
      courses => console.log(courses),
      noop, // () => {}, ==> instead of passing empty function. You can simply pass noop (no operation)
      () => console.log('completed')
    );

    const test$ = of(1, 2, 3);
    const test1$ = of(5, 23, 0);
    const test2$ = of('AVVV', 23, 0);
    const result = concat(test1$, test$, test2$);
    const subs = result.subscribe(value => console.log(value));
  }
}


