import {Component, NgModule, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Message} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  msgs: Message[] = [];
  userform: FormGroup;
  submitted: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private data: DataService,
    public authService: AuthService) {}

  ngOnInit() {
    this.userform = this.fb.group({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')])),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
    this.initForm();
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['../user-panel'], {
        relativeTo: this.route
      });
    }
  }

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      }
    };
  }

  initForm() {
    const minPassLength = 6;
    this.userForm = this.fb.group( {
      email: ['', Validators.compose([
        Validators.email,
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(minPassLength)
      ])],
      passwordRepeat: ['', Validators.compose([
        Validators.required,
        Validators.minLength(minPassLength)
      ])]
    }, {
      validator: this.matchingPasswords('password', 'passwordRepeat')
    });
    console.log(this.userForm);
  }

  signup() {
    if (this.userform.valid) {
      this.data.toggleLoading(true);
      this.authService.signup(
        this.userform.get('email').value,
        this.userform.get('password').value)
        .then(value => {
          localStorage.setItem('user', value.uid);
          this.data.toggleLoading(false);
          this.router.navigate(['../user-panel'], {
            relativeTo: this.route
          });
        })
        .catch(err => {
          this.data.toggleLoading(false);
          alert(err.message);
        });
      const username = JSON.stringify(this.userform.value.email).replace(/['']/g, '');
      this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Greetings, ' + username});
    }
  }
  get diagnostic() { return JSON.stringify(this.userform.value); }
}
