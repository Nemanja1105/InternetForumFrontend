import { DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/TokenService/token-service.service';
import { ForumService } from '../services/ForumService/forum.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { ForumCategoryService } from '../services/ForumCategoryService/forum-category.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-forum-comments',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, DatePipe, NgbCollapseModule, NgClass, MatTooltip],
  templateUrl: './forum-comments.component.html',
  styleUrl: './forum-comments.component.css'
})
export class ForumCommentsComponent {

  constructor(private fb: FormBuilder, private ar: ActivatedRoute, private jwtService: TokenService,
    private forumService: ForumService, private snackBar: CustomSnackBarService, private forumCategoryService: ForumCategoryService,
    private router: Router, private dialog: MatDialog) {
    this.ar.params.subscribe((params) => {
      this.id = params['id'];
      this.forumCategoryService.findById(this.id).subscribe({
        next: (data) => {
          this.forumCategory = data;
        }, error: () => {
          router.navigate(['']);
        }
      });
      this.forumService.findAllCommentByCategoryId(this.id).subscribe({
        next: (data) => { this.comments = data; }, error: () => {
          this.snackBar.openSnackBar(
            'Error communicating with the server',
            'close',
            false
          );
        }
      })
    });
    this.clientId = jwtService.getUser().id;
    this.client = jwtService.getUser();
  }
  form = this.fb.group({ message: ['', Validators.required] });
  id: any = null;
  clientId: any = null;
  forumCategory: any = null;
  comments: any = [];
  selectedComment: any = null;
  isCollapseClosed = true;
  client: any = null;

  onBlur(control: any) {
    control.markAsTouched();
  }

  selectCommentForEdit(comment: any) {
    this.selectedComment = comment;
    this.isCollapseClosed = false;
    console.log(comment);
    this.form.patchValue({ message: comment.comment });
  }

  openNewMessageCollapse() {
    this.form.reset();
    this.isCollapseClosed = !this.isCollapseClosed;
    this.selectedComment = null;
  }



  deleteComment(comment: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, { data: { message: "Are you sure you want to delete comment?" } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.forumService.deleteComment(this.id, comment.id, this.clientId).subscribe({
          next: () => {
            this.snackBar.openSnackBar(
              'Comment successfully deleted',
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
        });
      }
    })

  }


  canEdit(comment: any) {
    return (comment?.sender?.id === this.client.id || this.client.role === 'Admin' || this.client.role === 'Moderator') && this.haspermission('update');
  }

  canDelete(comment: any) {
    return (comment?.sender?.id === this.client.id || this.client.role === 'Admin' || this.client.role === 'Moderator') && this.haspermission('delete');
  }

  canCreate() {
    return this.haspermission('create');
  }


  haspermission(perm: any) {
    return this.client.permissions.includes(perm);
  }

  createMessage() {
    let tmp = this.form.value;
    let obj = { comment: tmp.message, senderId: this.clientId }

    if (this.selectedComment) {
      this.forumService.editComment(this.id, this.selectedComment.id, obj).subscribe({
        next: () => {
          this.snackBar.openSnackBar(
            'Comment successfully changed',
            'close',
            true
          );
          this.comments = this.comments.filter((el: any) => el.id !== this.selectedComment.id);
          this.form.reset();
          this.selectedComment = null;
          this.isCollapseClosed = true;
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
      });
    }
    else {
      this.forumService.sendForVerification(this.id, obj).subscribe({
        next: () => {
          this.snackBar.openSnackBar(
            'Comment successfully sent for verification',
            'close',
            true
          );
          this.form.reset();
          this.isCollapseClosed = true;
        }, error: (error) => {
          if (error.status === 400) {
            this.jwtService.logout();
            this.router.navigate(['/login']);
          }
          else {
            this.snackBar.openSnackBar(
              'Error communicating with the server',
              'close',
              false
            );
          }
        }
      });
    }
  }
}



