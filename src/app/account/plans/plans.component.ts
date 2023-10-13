import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { RecipeSummary } from 'src/app/models/recipe.summary';
import { RecipeService } from 'src/app/services/recipe.service';
import { PlansService } from 'src/app/services/plans.service';
import { ToastMessageService } from 'src/app/services/message.service';
import { Plan } from 'src/app/models/plan.model';
import { environment } from 'src/environments/environment';
import { PlansSharedService } from '../servcies/sharedPlanning.service';


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
export class PlansComponent implements OnInit{
  
  searchQuery: string = '';
  searchResult: RecipeSummary[];
  showRecipeSearch: boolean = false;
  // actual drawn row days 
  days: Day[] = [];
  // MAterial uses a `cdkDropListConnectedTo` array of ids to identify and establish a connection between 
  // all cdkDropList day containers.
  daysIDs: string[] = [];
  selectedDayIdx: number = 0;
  plans: Plan[];
  ImagesUrl = environment.ImagesUrl;
  
  constructor(
    private recipeService: RecipeService,
    private planService: PlansService,  
    private messageService: ToastMessageService,
    private eventService: PlansSharedService,
  ) {
  }

  ngOnInit() { 
    this.eventService.plans$.subscribe(plans => {
      this.plans = plans;
    });

    this.gerneateWeekDays();

    for (let day of this.days) {
      this.daysIDs.push(day.dayId);
    };

    this.recipeService.GetAllRecipes(1, 5).subscribe(res => {
      this.searchResult = res.items;
    });

    this.planService.GetAllPlans().subscribe(plans => {
      // map plans to their respective days withing the current week
      for (const plan of plans) {
        const planDate = plan.day.split('T')[0];
        const existingDay = this.days.find(day => day.date === planDate);
        if (existingDay) {
          existingDay.plans.push(plan);
        }
      }
      this.plans = plans;
    })
  }
  
  updatePlansOnCalendar(): void {
    this.eventService.updatePlans(this.plans);
  }
  
  showDialog(dayIdx: number) {
    this.showRecipeSearch = true;
    this.selectedDayIdx = dayIdx;
  }

  searchRecipes(){
    if(this.searchQuery !== ''){
      this.recipeService.SearchRecipes(this.searchQuery).subscribe(res => {
        this.searchResult = res.items;
      })
    }
  }

  addPlanToDay(recipe: RecipeSummary){
    const day = this.days[this.selectedDayIdx];
    this.planService.AddToPlans(day.date, recipe.id).subscribe(res =>{
      this.messageService.showSuccessMessage("Recipe Added to plan");
      this.showRecipeSearch = false;

      const newPlan: Plan = {recipe: recipe, day: res.day, id: res.id };
      this.days[this.selectedDayIdx].plans.push(newPlan);
      
      this.plans.push(newPlan);
      this.updatePlansOnCalendar();
    });
  }

  removePlan(dayIdx: number, planId: number){
    this.planService.RemovePlan(planId).subscribe(res =>{
      this.messageService.showSuccessMessage("Recipe removed");
      this.days[dayIdx].plans = this.days[dayIdx].plans.filter(x => x.id !== planId);
    });
    this.plans = this.plans.filter(x => x.id !== planId);
    this.updatePlansOnCalendar();
  }

  drop(event: CdkDragDrop<string[]> | any) {
    if (event.previousContainer === event.container) {
      // Move within the same day
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      // Move to a different day
      const plan = event.previousContainer.data[0];
      let day = this.days.find(x => x.dayId === event.container.id);
      
      if(day !== undefined && day?.plans.length < 3) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.planService.changePlanDate(plan.id, day?.date).subscribe(res =>{
          // this.messageService.showSuccessMessage("asdf");
          plan.day = day?.date;
        });
      }
      
      const plann: any = this.plans.find(x => x.id === plan.id);
      plann.day= day?.date;
      this.updatePlansOnCalendar();

    }
  }

  gerneateWeekDays(){
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
