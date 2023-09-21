import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
// import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthGuard } from '../helpers/auth.guard';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';

const routes: Routes = [
  { path: 'recipes', component: IndexComponent },
  { path: 'recipes/shopping_list', component: ShoppingListComponent, canActivate: [AuthGuard]  },
  { path: 'recipes/create', component: CreateComponent, canActivate: [AuthGuard]  },
  { path: 'recipes/:recipeId', component: ViewComponent },
  { path: 'recipes/:recipeId/edit', component: EditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ConfirmationService,
    MessageService
  ],
})
export class RecipeRoutingModule { }