import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RecipeManagementModule } from './recipe-management/recipe-management.module';

import { AppComponent } from './app.component';
import { AddRecipeService } from './services/add-recipe.service';
import { CreateComponent } from './recipe-management/create/create.component';
import { CategoriesService } from './services/category.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RecipeManagementModule,
    AppRoutingModule
  ],
  providers: [AddRecipeService, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
