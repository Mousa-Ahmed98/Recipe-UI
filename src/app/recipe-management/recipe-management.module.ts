// Components
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SearchComponent } from './search/search.component';

// Angular stuff
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RecipeRoutingModule } from "./recipe-routing.module";

// Prime ng modules
import {PanelModule} from 'primeng/panel';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

// Material Modules
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule} from "@angular/material/select"
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../material.module';
import { NgxStarRatingModule } from 'ngx-star-rating';


// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    ViewComponent,
    ShoppingListComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    BrowserAnimationsModule,
    DialogModule,
    TableModule,
    MaterialModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    NoopAnimationsModule,
    NgxStarRatingModule,
    CardModule,
    AccordionModule,
    ConfirmPopupModule,
    PanelModule,
    MatInputModule,
    TablerIconsModule.pick(TablerIcons),
    RatingModule,
    ButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
    CalendarModule
  ],
  exports:[
    TablerIconsModule
  ],
  providers:[
    ConfirmationService,
    MessageService
  ]

})
export class RecipeManagementModule { }
