import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { RecipeSummary } from 'src/app/models/recipe.summary';
import { RecipeService } from 'src/app/services/recipe.service';
import { PlansService } from 'src/app/services/plans.service';
import { ToastMessageService } from 'src/app/services/message.service';
import { Plan } from 'src/app/models/plan.model';

interface Day {
  dayId: string;
  name: string;
  date: string;
  plans: Plan[];
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent {
  
  searchResult: RecipeSummary[];
  searchQuery: string = '';
  days: Day[] = [];
  plans: Plan[];
  showRecipeSearch: boolean = false;
  selectedDayIdx: number = 0;
  
  connectedTo: string[] = [];
  
  constructor(
    private recipeService: RecipeService,
    private planService: PlansService,  
    private messageService: ToastMessageService
    ) {
      this.gerneateDays();
      for (let day of this.days) {
        this.connectedTo.push(day.dayId);
      };
    }
  
  ngOnInit() { 
    this.recipeService.GetAllRecipes(1, 5).subscribe(res => {
      this.searchResult = res.items;
      // this.days[0].recipes.push(this.searchResult[0])
      // this.days[0].recipes.push(this.searchResult[1])
      // this.days[0].recipes.push(this.searchResult[2])
      
      // this.days[1].recipes.push(this.searchResult[2])
      // this.days[1].recipes.push(this.searchResult[2])
      // this.days[2].recipes.push(this.searchResult[2])
    });

    this.planService.GetAllPlans().subscribe(plans => {
      for (const plan of plans) {
        const planDate = plan.day.split('T')[0];
        const existingDay = this.days.find(day => day.date === planDate);
        if (existingDay) {
          existingDay.plans.push(plan);
        }
      }      
    })

}


showDialog(idx: number) {
  this.showRecipeSearch = true;
  this.selectedDayIdx = idx;
}

searchRecipes(){
  if(this.searchQuery !== ''){
    this.recipeService.SearchRecipes(this.searchQuery).subscribe(res => {
      this.searchResult = res.items;
    })
  }
}

addToDay(recipe: RecipeSummary){
  const day = this.days[this.selectedDayIdx];
  this.planService.AddToPlans(day.date, recipe.id).subscribe(res =>{
    this.messageService.showSuccessMessage("Recipe Added to plan");
    this.showRecipeSearch = false;
    this.days[this.selectedDayIdx].plans.push({recipe: recipe, day: res.day, id: res.id });
  });
}

removePlan(dayIdx: number, planId: number){
  this.planService.RemovePlan(planId).subscribe(res =>{
    this.messageService.showSuccessMessage("Recipe removed");
    
    this.days[dayIdx].plans = this.days[dayIdx].plans.filter(x => x.id !== planId);
  });
}

drop(event: CdkDragDrop<string[]> | any) {
  if (event.previousContainer === event.container) {
    // Move within the same day
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    // Move to a different day
    const plan = event.container.data[0];
    console.log(plan);
    console.log("data ,,, ", event.container.data);
    
    let day = this.days.find(x => x.dayId === event.container.id);
    if(day !== undefined && day?.plans.length <= 2) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
        
      this.planService.changePlanDate(plan.id, day?.date).subscribe(res =>{
        // this.messageService.showSuccessMessage("asdf");
      });
    }
  }

}

  gerneateDays(){
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
    
      let d = String(currentDate.getDate()).padStart(2, '0');
      let m = String(currentDate.getMonth() + 1).padStart(2, '0');
      let y = currentDate.getFullYear();
    
      let formattedDate = `${y}-${m}-${d}`;
      const dayName = currentDate.toLocaleString("en-US", { weekday: "long" });
    
      const day = {
        dayId: `day-${i}`,
        name: dayName,
        date: formattedDate,
        plans: [],
      };
    
      this.days.push(day);
    }
  }

}
