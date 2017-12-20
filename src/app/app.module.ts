import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TalkRegisterComponent } from './talk-register/talk-register.component';
import { TalkTableComponent } from './talk-table/talk-table.component';

import { TalkService } from './shared/services/talk.service';
import { SpeakerService } from './shared/services//speaker.service';

@NgModule({
  declarations: [
    AppComponent,
    TalkRegisterComponent,
    TalkTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    TalkService,
    SpeakerService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
