import { Component, Input, OnInit } from '@angular/core';
import { Rating } from '../../models/review.model';
import { User } from 'src/app/modules/shared/models/user.model';
import { RatingRequest } from 'src/app/modules/recipe-management/models/review.request';
import { FeedbackService } from '../../services/feedback.service';
import { ToastMessageService } from 'src/app/modules/core/services/toast.message.service';
import { AuthenticationService } from 'src/app/modules/core/services/auth.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @Input() recipeId: number;
  @Input() ratings: Rating[];
  @Input() comments: Rating[];
  @Input() myRating: Rating | null = null;
  
  loggedIn = (): boolean => this.authService.userValue !== null;
  
  constructor(
    private feedbackService: FeedbackService,
    private messageService: ToastMessageService,
    private authService: AuthenticationService,
    ) {
  }
  
  editingReview = false;
  commmentInput: string = '';
  ratingRequest: RatingRequest;
  
  get myUser(): User { return this.authService.userValue! };

  ngOnInit(): void {

    this.ratingRequest = { 
      content : "",
      NumberOfStars : 0,
      recipeId : this.recipeId
    };
    
    // filter the ratings to exclude the user rating 
    // as it will be displayed on the top of the ratingsection
    console.log(this.ratings);
    this.ratings = this.ratings.filter(x => x.user.userName !== this.authService.userValue?.userName);
  }

  submitReview(){
    if(this.editingReview){
      this.editingReview = false;
      this.feedbackService.updateReview(this.ratingRequest).subscribe(res => {
        this.myRating = res;
        this.messageService.showSuccessMessage("Rating edited successfully");
      });
    }else{
      const rr = this.ratingRequest;
      this.feedbackService.addReview(this.ratingRequest).subscribe(res => {
        this.myRating = res;
        this.messageService.showSuccessMessage("Rating Added successfully");
      });
    }
  }

  editReview(){
    const myrr = this.myRating!;
    this.ratingRequest.NumberOfStars = myrr.numberOfStars;
    this.ratingRequest.content = myrr.content;
    
    this.editingReview = true;
  }

  deleteReview(){
    this.feedbackService.deleteReview(this.recipeId).subscribe(res => {
      this.myRating = null;
    });
  }

}
