import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Course} from '../model/course';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {fromEvent, noop, of} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {StoreService} from '../common/store.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  course: Course;

  @ViewChild('saveButton') saveButton: ElementRef;
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CourseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) course: Course,
              private store: StoreService) {

    this.course = course;
    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });

  }

  ngOnInit(): void {
  //this.form.valueChanges.subscribe(console.log);
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        concatMap(changes => this.save(changes))
      ).subscribe();

  }

  ngAfterViewInit() {
    fromEvent(this.saveButton.nativeElement, 'click').pipe(
      exhaustMap(() => this.save(this.form.value))
    ).subscribe();


  }

  // save() {
  //   this.store.saveCourse(this.course.id, this.form.value)
  //     .subscribe(
  //       () => this.close(),
  //       err => console.log('Error saving course', err)
  //     );
  // }

  save(changes: any) {
    return fromPromise(fetch(`api/courses/${this.course.id}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }

  close() {
    this.dialogRef.close();
  }


}
