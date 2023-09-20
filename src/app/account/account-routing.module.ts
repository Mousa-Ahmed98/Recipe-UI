import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritesComponent } from './favourites/favourites.component';
import { LayoutComponent } from './layout/layout.component';
import { PlansComponent } from './plans/plans.component';
import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  {
    path: 'profile', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'favourites', pathMatch: 'full' }, 
        { path: 'favourites', component: FavouritesComponent  },
        { path: 'plans', component: PlansComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
