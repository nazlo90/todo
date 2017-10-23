import { Component, OnInit } from '@angular/core';
import {RedditService} from '../services/reddit.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  providers: [RedditService]
})
export class LoaderComponent implements OnInit {

  public isShow$: Observable <boolean>;
  constructor(private dataService: RedditService) {
    this.isShow$ = this.dataService.listenToogling();
  }

  ngOnInit() {}

}
