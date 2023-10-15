// Components
import { IndexComponent } from './components/index/index.component';
import { ViewComponent } from './components/view/view.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { SearchComponent } from './components/search/search.component';

import { NgModule } from "@angular/core";

// Prime ng modules
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';

import { RecipeRoutingModule } from "./recipe-routing.module";
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    ViewComponent,
    SearchComponent,
  ],
  imports: [
    SharedModule,
    RecipeRoutingModule,
    ConfirmDialogModule,
    CalendarModule,
  ],
  exports:[
  ],
  providers:[
  ]

})
export class RecipeManagementModule { }
