import {Component, OnInit} from '@angular/core';
import {RedditService} from './services/reddit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private reddit: RedditService) {}
  ngOnInit() {
    console.log(this.reddit.toggleLoading);
    this.reddit.toggleLoading(true);
    setTimeout(() => { this.reddit.toggleLoading(false); }, 5000);
  }
}
