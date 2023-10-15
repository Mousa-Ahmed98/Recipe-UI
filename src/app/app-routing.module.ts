import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) },
  { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
