import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';

// prime ng modules
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    CardModule,
    ButtonModule
  ]
})
export class RecipeManagementModule { }
