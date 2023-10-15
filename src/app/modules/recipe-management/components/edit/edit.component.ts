import {  Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/modules/recipe-management/models/category.model';
import { CategoriesService } from 'src/app/modules/shared/services/category.service';
import { RecipeService } from 'src/app/modules/shared/services/recipe.service';
import { Ingredient } from 'src/app/modules/recipe-management/models/Ingredient.model';
import { Step } from 'src/app/modules/recipe-management/models/step.model';
import { Recipe } from 'src/app/modules/recipe-management/models/recipe.model';
import { RecipeRequest } from 'src/app/modules/recipe-management/models/recipe.request';
import { AuthenticationService } from 'src/app/modules/core/services/auth.service';
import { ToastMessageService } from 'src/app/modules/core/services/toast.message.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  recipe: Recipe;
  recipeName: string = "";
  recipeId: number;
  ImgUrl:any;
  localImageData: string = ""; 
  IsHidden:boolean=false;
  addForm!: FormGroup;
  categories: Category[] = [];
  selectedCategoryId: number = 0; 
  imagesUrl = environment.ImagesUrl;

  constructor(
    private recipeService: RecipeService,
    private categoryService:CategoriesService, 
    private authService: AuthenticationService, 
    private router:Router, 
    private route: ActivatedRoute,
    private messageService: ToastMessageService,
    ) {
   }

   ngOnInit(): void {
    
    this.addForm = new FormGroup({
      'recipeData': new FormGroup({
        'recipename': new FormControl(null),
      }),
      'ingredients': new FormArray([]),
      'steps': new FormArray([]),
    });
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('recipeId') ?? '0' ;
      this.recipeId = parseInt(id , 10);
    });

    this.categoryService.getCategories().subscribe(
      cats => {
        this.categories = cats;
        }
    );

    this.recipeService.GetRecipeById(this.recipeId).subscribe(
      recipe => {
        this.recipe = recipe;
         this.addForm.get("recipeData")?.get("recipename")?.setValue(recipe.name);
         this.recipeName = recipe.name;
         this.selectedCategoryId = recipe.category.id ;
         
         const setpsArray = this.addForm.get('steps') as FormArray;
         recipe.steps.forEach(element => {
          setpsArray.push( new FormControl(element.description));
         });
         
        const ingredientsArray = this.addForm.get('ingredients') as FormArray;
        recipe.ingredients.forEach(element => {
          ingredientsArray.push( new FormControl(element.description));
        });

        },
        error => {
          
        }
    );
  }

  onCategorySelectionChange(event: any) {
    this.selectedCategoryId = event.value;  
  }

  onImageInputChange(event: Event): void {
    
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.readFileAsDataURL(file);
    }
  }

  readFileAsDataURL(file: File): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.localImageData = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    
    let ingredients: Ingredient[] = [];
    let steps: Step[] = [];
    
    const IngredientsArray = (this.addForm.get('ingredients') as FormArray).value;
    for(let i = 0; i < IngredientsArray.length; i++){
      ingredients.push({id: 0,  description :IngredientsArray[i]});
    }
    
    const StepsArray = (this.addForm.get('steps') as FormArray).value;
    for(let i = 0; i < StepsArray.length; i++){
      steps.push({id: 0, description: StepsArray[i], order : i + 1});
    }

    // Create an instance of Recipe
    const recipeRequest: RecipeRequest = {
      Name: this.addForm.get('recipeData.recipename')!.value,
      ImageData: this.localImageData,
      CategoryId: this.selectedCategoryId,
      Ingredients: ingredients,
      AuthorId:this.authService.userValue?.userId!,
      Steps: steps,
    }

    this.recipeService.updateRecipe(this.recipeId ,recipeRequest).subscribe(
      (response) => {
        this.messageService.showSuccessMessage("Recipe edited successfully!")
        this.router.navigate(['/recipes', this.recipeId]);  
      },
      (error) => {
        console.log(error.error);
      }
      );
  }

  get ingredientsControls() {
    return (<FormArray>this.addForm.get('ingredients')).controls;
  }

  get stepsControls() {
    return (<FormArray>this.addForm.get('steps')).controls;
  }

  onAddIngredient(value?:string) {
  const ingredientsArray = this.addForm.get('ingredients') as FormArray;
  ingredientsArray.push( new FormControl(value));
  }

  onRemoveIngredient(index: number) {
    const ingredientsArray = this.addForm.get('ingredients') as FormArray;
    ingredientsArray.removeAt(index);
  }

  OnAddStep(value?: string) {
    const setpsArray = this.addForm.get('steps') as FormArray;
    setpsArray.push( new FormControl(value));
  }

  onRemoveStep(index: number) {
    const setpsArray = this.addForm.get('steps') as FormArray;
    setpsArray.removeAt(index);
  }

}
