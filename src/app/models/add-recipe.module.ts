export class Recipe{
    id;
    name: string;
    imageURL: string;
    categoryId: number;
    ingredients: Ingredient[];
    steps: Step[];
    constructor(Name: string,Image: string, CategoryId: number, Ingredients: Ingredient[],Steps: Step[], Id?:number){
      this.id = Id;
      this.name = Name;
      this.imageURL = Image;
      this.categoryId = CategoryId;
      this.ingredients = Ingredients;
      this.steps = Steps;
    }
  }

  export class Recipe2{
    Name: string;
    ImageUrl: string;
    CategoryId: number;
    Ingredients: Ingredient[];
    Steps: Step[];
    constructor(Name: string,Image: string, CategoryId: number, Ingredients: Ingredient[],Steps: Step[]){
      this.Name = Name;
      this.ImageUrl = Image;
      this.CategoryId = CategoryId;
      this.Ingredients = Ingredients;
      this.Steps = Steps;
    }
  }
  
  export class Step{
    description: string;
    order: number;
    constructor(step: string){
      this.description = step;
      this.order = 0;
    }
  }


  export class Ingredient{
    description: string;
    constructor(description: string){
      this.description = description;
    }
  }