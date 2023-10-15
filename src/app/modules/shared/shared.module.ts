// Components
import { NothinHereYetComponent } from './components/nothing-here-yet/nothing-here-yet.component'
import { SpinnerComponent } from './components/spinner/spinner.component';

// Angular stuff
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material stuff
import { MaterialModule } from './material.module'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule} from "@angular/material/select"
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { CommonModule } from '@angular/common';

// Prime ng 
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';


@NgModule({
  declarations: [
    NothinHereYetComponent,
    SpinnerComponent,
  ],
  imports:[
    TablerIconsModule.pick(TablerIcons),
    CommonModule,
  ],
  providers: [
  ],
  exports: [
    NothinHereYetComponent,
    SpinnerComponent,
    CommonModule,
    TablerIconsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MessagesModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    AvatarGroupModule,
    AvatarModule,
    MatDialogModule,
    DialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    TableModule,
    PaginatorModule,
    MessageModule,
    ToastModule,
    RouterModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxStarRatingModule,
    CardModule,
    AccordionModule,
    ConfirmPopupModule,
    PanelModule,
    RatingModule,
    ButtonModule,
  ],
})
export class SharedModule { }
