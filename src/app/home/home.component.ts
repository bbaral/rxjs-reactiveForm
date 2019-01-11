import {Component, OnInit} from '@angular/core';
import {StoreService} from '../common/store.service';
import {Observable} from 'rxjs';
import {Course} from '../model/course';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private store: StoreService) {}

  ngOnInit() {
    const course$ = this.store.courses$;
    this.beginnerCourses$ = this.store.selectBeginnerCourses();
    this.advancedCourses$ = this.store.selectAdvancedCourses();
  }

}
