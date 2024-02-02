import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ForumCategoryService } from '../services/ForumCategoryService/forum-category.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {
  categories: any = []
  constructor(private forumCategoryService: ForumCategoryService, private snackBar: CustomSnackBarService) {
    this.forumCategoryService.findAll().subscribe({
      next: (data) => { this.categories = data }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    })
  }

}
