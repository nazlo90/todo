import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {WikiModule} from './wiki/wiki/wiki.module';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import {ButtonModule, MenubarModule} from 'primeng/primeng';
import { WallpaperlistingComponent } from './wallpaperlisting/wallpaperlisting.component';
import {NgxCarouselModule} from 'ngx-carousel';
import 'hammerjs';
import { LoaderComponent } from './loader/loader.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RedditService} from './services/reddit.service';
import {WikiService} from './wiki/wiki.service';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {DataService} from './services/data.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AuthService} from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavComponent,
    HomeComponent,
    WallpaperlistingComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    AuthModule,
    AppRoutingModule,
    WikiModule,
    RouterModule,
    MenubarModule,
    ButtonModule,
    NgxCarouselModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [RedditService, WikiService, DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
