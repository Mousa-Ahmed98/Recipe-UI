import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

import { recipes } from './dummy.data';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  GetAllRecipes(): Recipe[] {
    return recipes;
  }
}