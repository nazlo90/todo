import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AuthRoutingModule} from './auth-routing.module';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {
  ButtonModule, ConfirmationService, ConfirmDialogModule, DragDropModule, GrowlModule, InputTextModule, MessagesModule,
  PanelModule, ProgressBarModule
} from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PanelModule,
    ButtonModule,
    GrowlModule,
    InputTextModule,
    MessagesModule,
    DragDropModule,
    ConfirmDialogModule,
    ProgressBarModule
  ],
  declarations: [LoginComponent, RegisterComponent, UserPanelComponent],
  providers: [AuthService, AuthGuard, ConfirmationService]
})
export class AuthModule { }
