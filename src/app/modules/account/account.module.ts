import { NgModule } from '@angular/core';

// modules
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from './../shared/shared.module';

// components
import { FavouritesComponent } from './components/favourites/favourites.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrandingComponent } from './components/sidebar/branding.component';
import { AppNavItemComponent } from './components/sidebar/nav-item/nav-item.component';
import { PlansComponent } from './components/plans/plans.component';
import { MyRecipesComponent } from './components/my-recipes/my-recipes.component';
import { CalendarComponent } from './components/calendar/calendar.component'; 
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';

import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { FullCalendarModule } from '@fullcalendar/angular'; 


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
    ProfileInfoComponent,
  ],
  imports: [
    AccountRoutingModule,
    SharedModule,
    CdkDropList,
    CdkDrag,
    FullCalendarModule,
  ],
  exports: [
  ],
  providers:[
  ]
})
export class AccountModule { }
