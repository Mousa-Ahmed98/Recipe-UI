export class Recipe{
    Name: string;
    Image: string;
    CategoryId: number;
    Ingredients: Ingredient[];
    Steps: Step[];
    constructor(Name: string,Image: string, CategoryId: number, Ingredients: Ingredient[],Steps: Step[]){
      this.Name = Name;
      this.Image = Image;
      this.CategoryId = CategoryId;
      this.Ingredients = Ingredients;
      this.Steps = Steps;
    }
  }
  
  export class Step{
    step: string;
    order: number;
    constructor(step: string){
      this.step = step;
      this.order = 0;
    }
  }


  export class Ingredient{
    Description: string;
    constructor(description: string){
      this.Description = description;
    }
  }