import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { FavouritesComponent } from './favourites/favourites.component';
import { LayoutComponent } from './layout/layout.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MaterialModule } from '../material.module';
import { MatNavList } from '@angular/material/list';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrandingComponent } from './sidebar/branding.component';
import { navItems } from './sidebar/sidebar-data';
import { AppNavItemComponent } from './sidebar/nav-item/nav-item.component';
import { PaginatorModule } from 'primeng/paginator';
import { PlansComponent } from './plans/plans.component';
import { ScrollingService } from './servcies/scroll.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatCell } from '@angular/material/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatTabsModule } from '@angular/material/tabs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    FavouritesComponent,
    LayoutComponent,
    SidebarComponent,
    BrandingComponent,
    AppNavItemComponent,
    PlansComponent,
    CalendarComponent,
    MyRecipesComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    TablerIconsModule.pick(TablerIcons),
    MaterialModule,
    PaginatorModule,
    
    ButtonModule,
    DialogModule,
    InputTextModule,
    MatTabsModule,

    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserModule,
    NoopAnimationsModule,
    MatToolbarModule,
    CdkDropList,
    CdkDrag,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    TableModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    FullCalendarModule,
  ],
  exports: [TablerIconsModule
  ],
  providers:[
    ScrollingService,
    ConfirmationService
  ]
})
export class AccountModule { }
