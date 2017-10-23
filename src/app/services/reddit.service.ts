import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Wallpaper } from '../models/wallpaper.model';
import { WallpaperListing } from '../models/wallpaperlisting.model';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class RedditService {
  public loadingThread = new BehaviorSubject <boolean>(false);
  constructor(private http: Http) {

  }

  toggleLoading(isShow: boolean) {
    this.loadingThread.next(isShow);
  }
  listenToogling(): Observable<boolean> {
    return this.loadingThread.asObservable();
  }

  getWallpapers(after: string): Observable<WallpaperListing> {
    let path = '//www.reddit.com/r/wallpapers.json?raw_json=1';

    // continues from last item loaded
    if (after) path += '&after=' + after;

    return this.http
      .get(path)
      .map(this.mapWallpapers);
  }

  mapWallpapers(res: Response) {
    const body = res.json();
    const listing = new WallpaperListing();
    const wallpapers = new Array<Wallpaper>();

    body.data.children.forEach(post => {
      if (post.data.post_hint === 'image') {
        const item = new Wallpaper();

        item.url = post.data.url;
        item.title = post.data.title;

        const previewImages = post.data.preview.images;
        const resolutions = post.data.preview.images[0].resolutions;

        const previewImage = resolutions.filter(m => m.width === 960)[0];

        item.previewUrl = previewImage ? previewImage.url : item.url;

        wallpapers.push(item);
      }
    });

    listing.wallpapers = wallpapers;
    // listing.after = body.data.after;

    return listing;
  }
}
