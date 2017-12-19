import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TalkRegisterComponent } from './talk-register/talk-register.component';
import { TalkTableComponent } from './talk-table/talk-table.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: TalkRegisterComponent },
  { path: 'table', component: TalkTableComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }