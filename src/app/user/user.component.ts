import {
  Component, OnInit,
} from '@angular/core';
import { RecipeSummary } from '../models/recipe.summary';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { ToastMessageService } from '../services/message.service';
import { LoaderService } from '../services/loading.service';
import { PageEvent } from '../models/page.event';
import { UserService } from '../services/user.service';
import { AppUser } from '../models/appUser.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [
    './user.component.css'
  ]
})
export class UserComponent implements OnInit {
  recipes: RecipeSummary[] = [];
  first: number = 0;
  rows: number = 8;
  pageNumber: number = 1;
  totalRecords: number = 0;
  
  username: string;
  user: AppUser;
  loggedIn = (): boolean => this.accountService.userValue !== null;

  constructor(
    private recipeService: RecipeService, 
    private router: Router,
    private accountService: AuthenticationService,
    private toastMessageService: ToastMessageService,
    private loadingService: LoaderService,
    private userService: UserService,
    private route: ActivatedRoute,

  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username') ?? '' ; 
      this.username = username;
    }); 

    this.userService.GetUser(this.username).subscribe(res => {
      this.user = res;
      console.log(res);
      this.getRecipes();
    })
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.pageNumber = Math.ceil(this.first / this.rows) + 1;
    this.getRecipes();
  }

  getRecipes(){
    this.loadingService.startLoading();
    this.userService.GetUserRecipes(this.username, this.pageNumber, this.rows).subscribe(res =>{
      this.recipes = res.items;
      this.totalRecords = res.totalCount;
      this.rows = res.pageSize;
      this.loadingService.stopLoading();
    });
  }

  toggleFav(idx: number){
    let recipe = this.recipes[idx];
    
    if(recipe.inFavourites === true){
      this.recipeService.removeFromfavourites(recipe.id).subscribe(res => {
        if(res === true) {
          this.toastMessageService.showSuccessMessage("Removed from favourites");
        }
      });
    }else{
      this.recipeService.addToFavourites(recipe.id).subscribe(res => {
        if(res === true){
          this.toastMessageService.showSuccessMessage("Added to favourites");
        }
      });
    }
    recipe.inFavourites = !recipe.inFavourites;
  }
  
  toggleFollow(){
    if(this.user.isFollowed){
      this.userService.UnfollowUser(this.user.userName).subscribe(res => {
        this.user.followers -= 1;
        this.user.isFollowed = false;
        this.toastMessageService.showSuccessMessage("User Unfollowed Successfully");
      })
    }else{
      this.userService.FollowUser(this.user.userName).subscribe(res => {
        // this.user.followers++;
        this.user.followers += 1;
        this.user.isFollowed = true;
        this.toastMessageService.showSuccessMessage("User Followed Successfully");
      })
    }
  }

}

