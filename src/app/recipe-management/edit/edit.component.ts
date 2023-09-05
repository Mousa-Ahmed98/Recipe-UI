import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient, Step, Recipe } from 'src/app/models/add-recipe.module';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/category.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Food } from '../create/create.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
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

  
  constructor(private recipeService: RecipeService,private categoryService:CategoriesService, private router:Router, private cdr: ChangeDetectorRef) {
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
      
    });
   }
   ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      cats => {
        
        this.myCategories = cats;
         
         this.categories = [];
        //this.myCategories.forEach(element => this.categories.push({value: element.id , viewValue: element.name}));
        }
    );
    this.recipeService.GetRecipeById().subscribe(
      recipe => {
        
         
         
         this.localImageData = recipe.imageURL;
         
         
         this.addForm.get("recipeData")?.get("recipename")?.setValue(recipe.name);
         this.recipeName = recipe.name;
         this.selectedCategoryId = recipe.categoryId;
         
         recipe.steps.forEach(element => {
          
          this.onAddStep(element.description);
         });


         recipe.ingredients.forEach(element => {
          
          this.onAddIngredient(element.description);
         });

         this.cdr.detectChanges();
        //this.myCategories.forEach(element => this.categories.push({value: element.id , viewValue: element.name}));
        },
        error => {
          
        }
    );
    //this.onAddIngredient();
    //this.onAddStep();

  }

  onCategorySelectionChange(event: any) {
    // The selectedCategoryId property now contains the ID of the selected category.
    
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
      12
    );
    

    console.log(recipe);
    
    //Call the service to send the Recipe instance to the API
    this.recipeService.updateRecipe(recipe).subscribe(
      (response) => {
        // Handle the API response here
        alert("Recipe is updated successfully.");
        console.log(response);
        this.router.navigate(['/recipes']);
      },
      (error) => {
        // Handle any errors that occur during the API request
    
        alert(error.error);
      }
    );
    
    this.addForm.reset();
  }

  // onCategoryChange() {
    
  
  // }

  onAddIngredient(value?:string) {
    const control = new FormControl(value, [Validators.required]);
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


  onAddStep(value?: string) {
    const control = new FormControl(value, [Validators.required]);
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
