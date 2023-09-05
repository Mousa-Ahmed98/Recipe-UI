import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RecipeManagementModule } from './recipe-management/recipe-management.module';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MenubarModule} from 'primeng/menubar';


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
    AppRoutingModule,
    HttpClientModule,
    AccordionModule,
    BrowserAnimationsModule,
    MenubarModule,

  ],
  providers: [AddRecipeService, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
