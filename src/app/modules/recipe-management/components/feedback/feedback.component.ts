import { FeedbackService } from '../../services/feedback.service';
import { AuthenticationService } from 'src/app/modules/core/services/auth.service';
import { ToastMessageService } from 'src/app/modules/core/services/toast.message.service';

import { Comment } from '../../models/comment.model';
import { RatingRequest } from '../../models/review.request';
import { Rating } from '../../models/review.model';
import { Reply } from '../../models/reply.model';

import { Component, Input, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @Input() recipeId: number;
  @Input() ratings: Rating[];
  @Input() comments: Comment[];
  @Input() myRating: Rating | null = null;
  
  constructor(
    private feedbackService: FeedbackService,
    private messageService: ToastMessageService,
    private authService: AuthenticationService,
    private confirmationService: ConfirmationService,
    ) {
  }
  
  loggedIn = (): boolean => this.authService.userValue !== null;
  public get appUser (){ return this.authService.userValue! }
  
  // Review
  ratingRequest: RatingRequest;
  editingReview = false;
  
  // Comment
  commmentInput: string = '';
  editCommmentInput: string = '';
  editingCommentId = 0; // id of comment to be edited
  
  // Reply
  replyInput: string = '';
  eidtReplyInput: string = '';
  replyCommentId = 0; // id of comment to be replied to
  editingReplyId = 0;

  
  ngOnInit(): void {

    this.ratingRequest = { 
      content : "",
      NumberOfStars : 1,
      recipeId : this.recipeId
    };
    
    // filter the ratings to exclude the user rating 
    // as it will be displayed on the top of the ratingsection
    if(this.loggedIn()){
      this.ratings = this.ratings.filter(x => x.user.userName !== this.authService.userValue?.userName);
    }
  }

  submitReview(){
    if(this.ratingRequest.content == ''){
      this.messageService.showInfoMessgae("Please fill review first.");
      return;
    }

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
  
  // *** Comment ***

  postComment(){
    if(this.commmentInput == ''){
      this.messageService.showInfoMessgae("Comment Can't be empty");
      return;
    }
    this.feedbackService.addComment({
      content : this.commmentInput, 
      recipeId : this.recipeId
    }).subscribe(res =>{
      this.messageService.showSuccessMessage("Comment Added Successfully")
      this.commmentInput = '';
      res.user = this.appUser;
      this.comments.push(res);
    })
  }

  commentOwner(username: string): boolean {
    return this.authService.userValue!.userName === username;
  }

  editComment(comment: Comment){
    this.editCommmentInput = comment.content;
    this.editingCommentId = comment.id;
  }
  
  submitEditComment(){
    this.feedbackService.updateComment(this.editingCommentId, 
      {
        content: this.editCommmentInput,
        recipeId : this.recipeId
      }).subscribe(res => {
        let comment = this.comments.find(comment => comment.id === this.editingCommentId);
        comment!.content = this.editCommmentInput
        this.editingCommentId = 0;
        this.messageService.showSuccessMessage("Comment Edited Successfully")
      })
  }

  cancelEditComment(){
    this.editingCommentId = 0;
  }

  deleteComment(id: number){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.feedbackService.deleteComment(id).subscribe(res => {
          this.comments = this.comments = this.comments.filter(comment => comment.id !== id);
          this.messageService.showSuccessMessage("Comment Was Deleted Successfully")
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
              this.messageService.showInfoMessgae('You have rejected');
              break;
          case ConfirmEventType.CANCEL:
              this.messageService.showInfoMessgae('You have cancelled');
              break;
          }
        }
    });
  }

  // *** Reply ***

  selectCommentForReply(commentId: number){
    this.replyCommentId = commentId;
  }

  reply(){
    if(this.replyInput == ''){
      this.messageService.showInfoMessgae("Reply Can't be empty");
      return;
    }
    this.feedbackService.addReply(
      this.replyCommentId, 
      { content: this.replyInput }
    ).subscribe(res =>{
      let comment = this.comments.find(comment => comment.id === this.replyCommentId);
      res.user = this.appUser;
      comment?.replies.push(res);
      this.replyInput = '';
    })
  }


  deleteReply(reply: Reply){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.feedbackService.deleteRepy(reply.commentId, reply.id)
        .subscribe(res => {
          let comment = this.comments.find(comment => comment.id === reply.commentId);
          comment!.replies = comment!.replies.filter(x => x.id !== reply.id);
          this.messageService.showSuccessMessage("Reply Was Deleted Successfully")
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
              this.messageService.showInfoMessgae('You have rejected');
              break;
          case ConfirmEventType.CANCEL:
              this.messageService.showInfoMessgae('You have cancelled');
              break;
          }
        }
    });
  }
}
