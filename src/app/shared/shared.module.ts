import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NothinHereYetComponent } from './nothing-here-yet/nothing-here-yet.component'


@NgModule({
  declarations: [
    NothinHereYetComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NothinHereYetComponent
  ]
})
export class SharedModule { }
