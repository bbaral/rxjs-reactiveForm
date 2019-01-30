import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {Course} from '../model/course';
import {createHttpObservable} from './util';
import {delayWhen, filter, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

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

  saveCourse(courseId: number, changes: any): Observable<any> {
    const courses = this.subject.getValue();
    const courseIndex = courses.findIndex(c => c.id == courseId);
    const newCourse = courses.slice(0);
    newCourse[courseIndex] = {
      ...courses[courseIndex],
      ...changes
    };
    this.subject.next(newCourse);
    return fromPromise(fetch(`/api/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }

  selectCourseById(courseId: number) {
    return this.courses$.pipe(
      map(courses => courses.find(course => course.id == courseId)),
      filter(course => !!course)
    );
  }
}
