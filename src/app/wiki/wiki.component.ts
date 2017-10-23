import { Component, OnInit } from '@angular/core';
import {WikiService} from './wiki.service';
import {RedditService} from "../services/reddit.service";

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {
  items: any[] = [];
  terms: string;

  constructor(private wiki: WikiService, private reddit: RedditService) { }
  public search(terms) {
    this.wiki.search(terms)
      .subscribe(
      response => this.items = response
    );
  }
  ngOnInit() {

  }
}
