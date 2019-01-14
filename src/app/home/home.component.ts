import {Component, OnInit} from '@angular/core';
import {StoreService} from '../common/store.service';
import {noop, Observable} from 'rxjs';
import {Course} from '../model/course';
import {createHttpObservable} from '../common/util';
import {map} from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private storeService: StoreService) {}

  ngOnInit() {

    // const http$: Observable<Course[]> = createHttpObservable('api/courses');
    //
    // const courses$ = http$.pipe(map((res) => {
    //   Object.values(res["payload"]);
    // }));
    const courses$ = this.storeService.courses$;

    this.beginnerCourses$ = this.storeService.selectBeginnerCourses();
    this.advancedCourses$ = this.storeService.selectAdvancedCourses();

  }

}
