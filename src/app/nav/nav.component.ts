import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  public menuLinks: MenuItem [] = [];
  constructor(private firebaseAuth: AngularFireAuth, public authService: AuthService) {  }
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'fa-home',
        routerLink: '/'
      },
      {
        label: 'Wiki',
        icon: 'fa fa-wikipedia-w',
        routerLink: 'wiki'
      },
      {
        label: 'TODO',
        icon: 'fa fa-align-center',
        routerLink: 'user-panel'
      },
      {
        label: 'Login',
        icon: 'fa-edit',
        items: [
          {label: 'Login', icon: 'fa-sign-in', routerLink: 'login'},
          {label: 'Register', icon: 'fa-user ', routerLink: 'register'}
        ]
      }
    ];
  }
}
