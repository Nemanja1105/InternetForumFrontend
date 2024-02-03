import { DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { ForumService } from '../services/ForumService/forum.service';
import { TokenService } from '../services/TokenService/token-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-comments',
  standalone: true,
  imports: [ReactiveFormsModule, NgbCollapse, NgClass, DatePipe],
  templateUrl: './pending-comments.component.html',
  styleUrl: './pending-comments.component.css'
})
export class PendingCommentsComponent {

  constructor(private fb: FormBuilder, private snackBar: CustomSnackBarService, private router: Router, private forumService: ForumService, private jwtService: TokenService) {
    this.forumService.findAllPending().subscribe({
      next: (data) => {
        this.comments = data;
      }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    })
  }

  form = this.fb.group({ message: ['', Validators.required] });
  isCollapseClosed = true;
  comments: any = [];
  selectedComment: any = null;

  selectCommentForEdit(comment: any) {
    this.selectedComment = comment;
    this.isCollapseClosed = false;
    this.form.patchValue({ message: comment.comment });
  }

  openNewMessageCollapse() {
    this.form.reset();
    this.isCollapseClosed = !this.isCollapseClosed;
    this.selectedComment = null;
  }

  editComment() {
    let obj = this.form.value;
    this.selectedComment.comment = obj.message;
    this.openNewMessageCollapse();
  }

  onBlur(control: any) {
    control.markAsTouched();
  }

  acceptComment(comment: any) {
    this.forumService.acceptComment(comment.id, { message: comment.comment }).subscribe({
      next: () => {
        this.snackBar.openSnackBar(
          'Comment successfully approved!',
          'close',
          true
        );
        this.comments = this.comments.filter((el: any) => el.id !== comment.id);
      }, error: (error) => {
        if (error.status === 400) {
          this.jwtService.logout();
          this.router.navigate(['/login']);
        }
        else

          this.snackBar.openSnackBar(
            'Error communicating with the server',
            'close',
            false
          );
      }
    })
  }

  declineComment(comment: any) {
    this.forumService.declineComment(comment.id).subscribe({
      next: () => {
        this.snackBar.openSnackBar(
          'Comment successfully declined!',
          'close',
          true
        );
        this.comments = this.comments.filter((el: any) => el.id !== comment.id);
      }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    })
  }


}
