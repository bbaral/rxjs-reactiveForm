import {Component, OnInit} from '@angular/core';
import {StoreService} from './common/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: StoreService) {

  }

  ngOnInit() {
    this.store.init();
  }

}
