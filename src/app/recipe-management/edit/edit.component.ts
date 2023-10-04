import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from 'src/app/models/Ingredient.model';
import { Step } from 'src/app/models/step.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeRequest } from 'src/app/models/recipe.request';

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
  localImageData: string; 
  IsHidden:boolean=false;
  addForm!: FormGroup;
  categories: Category[] = [];
  selectedCategoryId: number = 0; 

  constructor(
    private recipeService: RecipeService,
    private categoryService:CategoriesService, 
    private router:Router, 
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
    ) {
    this.localImageData = "";
    
    this.addForm = new FormGroup({
      'recipeData': new FormGroup({
        'recipename': new FormControl(null),
      }),
      //'Imge':new FormControl(''),
      'ingredients': new FormArray([]),
      'steps': new FormArray([]),
    });
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('recipeId') ?? '0' ;
      this.recipeId = parseInt(id , 10);
    });
    this.addForm.statusChanges.subscribe(value => {
      
    });
   }
   ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      cats => {
        this.categories = cats;
        }
    );

    this.recipeService.GetRecipeById(this.recipeId).subscribe(
      recipe => {
        this.recipe = recipe;
         this.localImageData = recipe.imageName;
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

         // this.cdr.detectChanges();
        },
        error => {
          
        }
    );
  }

  onCategorySelectionChange(event: any) {
    // The selectedCategoryId property now contains the ID of the selected category.
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

  GetIamgeUrl(event: Event): void {
    // Your logic to handle the click event
  }

  get ingredientsControls() {
    return (<FormArray>this.addForm.get('ingredients')).controls;
  }

  get stepsControls() {
    return (<FormArray>this.addForm.get('steps')).controls;
  }

  onSubmit() {
    
    let ingredients: Ingredient[] = [];
    let steps: Step[] = [];
    
    const IngredientsArray = (this.addForm.get('ingredients') as FormArray).value;
    for(let i = 0; i < IngredientsArray.length;i++){
      ingredients.push({id: 0,  description :IngredientsArray[i]});
    }
    const StepsArray = (this.addForm.get('steps') as FormArray).value;
    for(let i = 0; i < StepsArray.length;i++){
      steps.push({id: 0, description: StepsArray[i], order : i + 1});
    }
    // Create an instance of Recipe
    
    const recipeRequest: RecipeRequest = {
      Name: this.addForm.get('recipeData.recipename')!.value,
      ImageData: this.localImageData,
      CategoryId: this.selectedCategoryId,
      Ingredients: ingredients,
      Steps: steps,
    }

    //Call the service to send the Recipe instance to the API
    this.recipeService.updateRecipe(this.recipeId ,recipeRequest).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        // Handle any errors that occur during the API request
        console.log(error.error);
      }
      );
      this.router.navigate(['/recipes', this.recipeId]);  
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
