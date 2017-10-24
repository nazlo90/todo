import {Component, NgModule, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {UserForm} from '../models/user-form';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Message} from 'primeng/primeng';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserForm = new UserForm();
  msgs: Message[] = [];
  userform: FormGroup;
  submitted: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private data: DataService,
    public authService: AuthService,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.userform = this.fb.group({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')])),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['../user-panel'], {
        relativeTo: this.route
      });
    }
  }
  login() {
    if (this.userform.valid) {
      this.data.toggleLoading(true);
      this.authService.login(
        this.userform.get('email').value,
        this.userform.get('password').value)
        .then(user => {
          console.log(user);
          localStorage.setItem(this.authService.srorageAuthKey, user.uid);
          this.data.toggleLoading(false);
          this.router.navigate(['../user-panel'], {
            relativeTo: this.route
          });
        })
        .catch(err => {
          this.data.toggleLoading(false);
          alert(err.message);
        });
      this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Login Completed'});
    }
  }
  get diagnostic() { return JSON.stringify(this.userform.value); }
}
