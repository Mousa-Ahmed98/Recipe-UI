import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/helpers/auth.guard'; 

import { SearchComponent } from './components/search/search.component';
import { IndexComponent } from './components/index/index.component';
import { ViewComponent } from './components/view/view.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path: 'recipes', component: IndexComponent },
  { path: 'recipes/create', component: CreateComponent, canActivate: [AuthGuard]  },
  { path: 'recipes/search', component: SearchComponent},
  { path: 'recipes/:recipeId', component: ViewComponent },
  { path: 'recipes/:recipeId/edit', component: EditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class RecipeRoutingModule { }