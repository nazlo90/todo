import {Component, OnInit} from '@angular/core';
import {RedditService} from '../services/reddit.service';
import {WallpaperListing} from '../models/wallpaperlisting.model';
import {NgxCarousel} from 'ngx-carousel';

@Component({
  selector: 'app-wallpaperlisting',
  templateUrl: './wallpaperlisting.component.html',
  styleUrls: ['./wallpaperlisting.component.css'],
  providers: [RedditService]
})
export class WallpaperlistingComponent implements OnInit {

  wallpaperListing: WallpaperListing;
  error: boolean;
  public carouselOne: NgxCarousel;
  constructor(private service: RedditService) {
  }

  ngOnInit() {
    this.wallpaperListing = new WallpaperListing();
    this.loadWallpapers(null);

    this.carouselOne = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    };
  }

  open(url: string) {
    window.open(url, '_blank');
  }

  loadWallpapers(after: string) {
    this.service
      .getWallpapers(after)
      .subscribe(result => {

          if (after === null) {
            this.wallpaperListing = result;
          } else {
            this.wallpaperListing.wallpapers = this.wallpaperListing.wallpapers.concat(result.wallpapers);
            this.wallpaperListing.after = result.after;
          }

        }, error => this.error = true
      );
  }


  loadMore() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loadWallpapers(this.wallpaperListing.after);
    }
  }
  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
  }
}
