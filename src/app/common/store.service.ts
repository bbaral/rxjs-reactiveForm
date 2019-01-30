import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {Course} from '../model/course';
import {createHttpObservable} from './util';
import {delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';

@Injectable()
export class StoreService {

  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  constructor() {
  }

  init(): void {
    const http$ = createHttpObservable('/api/courses');
    http$
      .pipe(
        tap(() => console.log('HTTP request executed')),
        map(res => Object.values(res['payload']))
      ).subscribe(courses => this.subject.next(courses));
  }

  selectBeginnerCourses() {
    return this.filterByCategory('BEGINNER');
  }

  selectAdvanceCourses() {
    return this.filterByCategory('ADVANCED');
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(
      map(courses => courses
        .filter(course => course.category == category))
    );
  }
}
