import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from 'src/app/models/Ingredient.model';
import { Step } from 'src/app/models/step.model';
import { RecipeRequest } from 'src/app/models/recipe.request';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})

export class CreateComponent implements OnInit{

  
  ImgUrl:any;
  localImageData: string; 
  categories: Category[] = [];
  IsHidden:boolean=false;
  addForm!: FormGroup;
  selectedCategoryId: number = 0;

  constructor(private recipeService: RecipeService,private categoryService:CategoriesService, private router:Router) {
    this.localImageData = "";
    
    this.addForm = new FormGroup({
      'recipeData': new FormGroup({
        'recipename': new FormControl(null),
       
      }),
      //'Imge':new FormControl(''),
      'ingredients': new FormArray([]),
      'steps': new FormArray([]),
    });
    

    this.addForm.statusChanges.subscribe(value => {
      console.log(value);
    });
   }
   ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      cats => {
        this.categories = cats;
      }
    );
    
    this.onAddIngredient();
    this.onAddStep();
  }

  onCategorySelectionChange(event: any) {
    // The selectedCategoryId property now contains the ID of the selected category.
    console.log('Selected Category ID:', this.selectedCategoryId);
  }

  onImageInputChange(event: Event): void {
    console.log(event.target);
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
      console.log("Image result");
      console.log(this.localImageData);
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
    console.log(this.addForm.get('recipeData.recipename')!.value);
    const IngredientsArray = (this.addForm.get('ingredients') as FormArray).value;
    for(let i = 0; i < IngredientsArray.length;i++){
      ingredients.push({id: 0, description: IngredientsArray[i]});
    }
    const StepsArray = (this.addForm.get('steps') as FormArray).value;
    for(let i = 0; i < StepsArray.length;i++){
      steps.push({id: 0, description: StepsArray[i], order : i + 1});
    }

    const recipeRequest: RecipeRequest =  {
      Name : this.addForm.get('recipeData.recipename')!.value,
      ImageUrl : this.localImageData,
      CategoryId :  this.selectedCategoryId,
      Ingredients :  ingredients,
      Steps : steps
    };

    console.log(recipeRequest);

    // Call the service to send the Recipe instance to the API
    this.recipeService.addRecipe(recipeRequest).subscribe(
      (response) => {
        // Handle the API response here
        this.router.navigate(['/recipes']);
      },
      (error) => {
        // Handle any errors that occur during the API request
        console.error('Error adding recipe:', error.error);
        alert(error.error);
      }
    );

    this.addForm.reset();
  }

  onAddIngredient() {
    const control = new FormControl("", [Validators.required]);
    const ingredientsArray = (<FormArray>this.addForm.get('ingredients') as FormArray).value;
  const numIngredients = ingredientsArray.length;
    (<FormArray>this.addForm.get('ingredients')).push(control);
    // Loop through existing form controls and patch their values
  for (let i = 0; i < numIngredients; i++) {
    const existingControl = ingredientsArray.at(i);
    const newValue = existingControl.value; // Get the current value
    existingControl.patchValue(newValue); // Patch the value to itself
  }
}

  onRemoveIngredient(index: number) {
    if(((<FormArray>this.addForm.get('ingredients')) as FormArray).length > 1)
    (<FormArray>this.addForm.get('ingredients')).removeAt(index);
    else{
      alert("There must be at least one ingredient for the recipe.");
    }
  }


  onAddStep() {
    const control = new FormControl("", [Validators.required]);
    const stepsArray = (<FormArray>this.addForm.get('steps') as FormArray).value;
  const numIngredients = stepsArray.length;
    (<FormArray>this.addForm.get('steps')).push(control);
    // Loop through existing form controls and patch their values
  for (let i = 0; i < numIngredients; i++) {
    const existingControl = stepsArray.at(i);
    const newValue = existingControl.value; // Get the current value
    existingControl.patchValue(newValue); // Patch the value to itself
  }
  }

  onRemoveStep(index: number) {
    if(((<FormArray>this.addForm.get('steps')) as FormArray).length > 1){
      (<FormArray>this.addForm.get('steps')).removeAt(index);
    }
  else{
    alert("There must be at least one step for the recipe.");
  }
  }

}
