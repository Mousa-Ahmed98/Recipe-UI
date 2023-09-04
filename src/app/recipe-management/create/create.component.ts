import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient, Recipe, Step } from 'src/app/models/add-recipe.module';
import { Category } from 'src/app/models/category.model';
import { AddRecipeService } from 'src/app/services/add-recipe.service';
import { CategoriesService } from 'src/app/services/category.service';


export interface Food {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})

export class CreateComponent implements OnInit{

  recipeName: string = "";
  ImgUrl:any;
  
  IsHidden:boolean=false;
  addForm!: FormGroup;
  myCategories: Category[] = [];
  selectedCategoryId: number = 0; // Initialize with null or a default value
  categories: Food[] = [
    {value: 1 , viewValue: 'Drinks'},
    {value: 2 , viewValue: 'Italian'},
    {value: 3 , viewValue: 'Tacos'},
  ];

  localImageData: string; 

  
  constructor(private addRecipeService: AddRecipeService,private categoryService:CategoriesService, private router:Router) {
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
        console.log("start");
        this.myCategories = cats;
         console.log(this.myCategories);
         this.categories = [];
        //this.myCategories.forEach(element => this.categories.push({value: element.id , viewValue: element.name}));
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
      ingredients.push(new Ingredient(IngredientsArray[i]));
    }
    const StepsArray = (this.addForm.get('steps') as FormArray).value;
    for(let i = 0; i < StepsArray.length;i++){
      steps.push(new Step(StepsArray[i]));
    }
    // Create an instance of Recipe
    
    const recipe = new Recipe(
      this.addForm.get('recipeData.recipename')!.value,
      this.localImageData,
      this.selectedCategoryId,
      ingredients,
      steps,
    );
    

    // Call the service to send the Recipe instance to the API
    this.addRecipeService.addRecipe(recipe).subscribe(
      (response) => {
        // Handle the API response here
        console.log('Recipe added successfully:', response);
        alert("Recipe is added successfully.");
        this.router.navigate(['/recipes']);
      },
      (error) => {
        // Handle any errors that occur during the API request
        console.error('Error adding recipe:', error.error);
        alert(error.error);
      }
    );
    console.log(this.addForm);
    this.addForm.reset();
  }

  // onCategoryChange() {
    
  //   console.log('Selected category ID:', this.selectedCategory);
  // }

  onAddIngredient() {
    const control = new FormControl(null, [Validators.required]);
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
    const control = new FormControl(null, [Validators.required]);
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
    if(((<FormArray>this.addForm.get('steps')) as FormArray).length > 1)
    (<FormArray>this.addForm.get('steps')).removeAt(index);
  else{
    alert("There must be at least one step for the recipe.");
  }
  }

     
}
