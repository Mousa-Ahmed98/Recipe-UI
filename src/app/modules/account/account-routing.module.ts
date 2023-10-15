import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/helpers/auth.guard'; 

import { PlansComponent } from './components/plans/plans.component'; 
import { LayoutComponent } from './components/layout/layout.component'; 
import { MyRecipesComponent } from './components/my-recipes/my-recipes.component'; 
import { FavouritesComponent } from './components/favourites/favourites.component'; 
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'favourites', pathMatch: 'full' }, 
      { path: 'favourites', component: FavouritesComponent  },
      { path: 'plans', component: PlansComponent },
      { path: 'my-recipes', component: MyRecipesComponent },
      { path: 'profile-info', component: ProfileInfoComponent },
      { path: 'shopping-list', component: ShoppingListComponent  },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
