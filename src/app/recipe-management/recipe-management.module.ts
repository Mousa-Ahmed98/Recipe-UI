// components
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

// common
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RecipeRoutingModule } from "./recipe-routing.module";

// prime ng modules
// import {PanelModule} from 'primeng/panel';
// import {ConfirmPopupModule} from 'primeng/confirmpopup';
// import { AccordionModule } from 'primeng/accordion';
// import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// mat
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule} from "@angular/material/select"
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    RecipeRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    NoopAnimationsModule,
    TablerIconsModule.pick(TablerIcons),

    // CardModule,
    // AccordionModule,
    // ConfirmPopupModule,
    // PanelModule,
    // MatInputModule,
    ButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
  ],
  exports:[
    TablerIconsModule
  ],
  providers:[
    ConfirmationService
  ]

})
export class RecipeManagementModule { }
