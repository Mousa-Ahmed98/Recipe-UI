import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritesComponent } from './favourites/favourites.component';
import { LayoutComponent } from './layout/layout.component';
import { PlansComponent } from './plans/plans.component';
import { AuthGuard } from '../helpers/auth.guard';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';

const routes: Routes = [
  {
    path: 'account', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'favourites', pathMatch: 'full' }, 
        { path: 'favourites', component: FavouritesComponent  },
        { path: 'plans', component: PlansComponent },
        { path: 'my-recipes', component: MyRecipesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
