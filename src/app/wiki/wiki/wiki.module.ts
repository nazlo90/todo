import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikiService } from '../wiki.service';
import { WikiComponent } from '../wiki.component';
import {InputTextModule, ButtonModule, TooltipModule} from 'primeng/primeng';
import {RedditService} from "../../services/reddit.service";

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TooltipModule
  ],
  providers: [
    WikiService
  ],
  declarations: [
    WikiComponent
  ]
})
export class WikiModule { }
