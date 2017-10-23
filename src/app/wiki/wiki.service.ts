import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import {RedditService} from '../services/reddit.service';

@Injectable()
export class WikiService {

  constructor(private jsonp: Jsonp) { }

  public search(term: string) {

    const wikiUrl = 'https://en.wikipedia.org/w/api.php';

    const params = new URLSearchParams();
    params.set('search', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp
      .get(wikiUrl, { search: params })
      .map(response => {
        const responseData = <string[]>response.json();
        const names = responseData[1];
        const descriptions = responseData[2];
        const links = responseData[3];
        const length = names.length;
        const result: any[] = [];

        for (let i = 0; i < length; ++i) {
          result.push({
            name: names[i],
            link: links[i],
            description: descriptions[i]
          });
        }

        return result;
      });
  }
}
