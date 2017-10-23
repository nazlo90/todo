import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DataService {

  currentPosition: Position;
  private geolocationCathed = new Subject <Position>();
  private loadingThread = new Subject <boolean>();
  constructor(private http: HttpClient) {}
  toggleLoading(isShow: boolean) {
    this.loadingThread.next(isShow);
  }
  listenToogling(): Observable<boolean> {
    return this.loadingThread.asObservable();
  }

}
