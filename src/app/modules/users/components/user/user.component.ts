import {
  Component, OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoaderService } from '../../../core/services/loading.service'; 
import { AuthenticationService } from '../../../core/services/auth.service'; 
import { ToastMessageService } from '../../../core/services/toast.message.service'; 
import { RecipeService } from 'src/app/modules/shared/services/recipe.service'; 
import { UserService } from 'src/app/modules/users/services/user.service'; 

import { PageEvent } from '../../../core/models/page.event'; 
import { RecipeSummary } from 'src/app/modules/shared/models/recipe.summary'; 
import { AppUser } from 'src/app/modules/authentication/models/appUser.model'; 

import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [
    './user.component.scss'
  ]
})
export class UserComponent implements OnInit {
  recipes: RecipeSummary[] = [];
  first: number = 0;
  rows: number = 8;
  pageNumber: number = 1;
  totalRecords: number = 0;
  imageUrl = environment.ImagesUrl;
  username: string;
  user: AppUser;
  loggedIn = (): boolean => this.accountService.userValue !== null;

  constructor(
    private recipeService: RecipeService, 
    private accountService: AuthenticationService,
    private toastMessageService: ToastMessageService,
    private loadingService: LoaderService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

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