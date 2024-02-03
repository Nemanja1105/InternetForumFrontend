import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }

  public sendForVerification(categoryId: any, request: any) {
    return this.http.post(config.API_URL + `/forum/${categoryId}/comments`, request);
  }

  public findAllCommentByCategoryId(categoryId: any) {
    return this.http.get(config.API_URL + `/forum/${categoryId}/comments`);
  }

  public editComment(categoryId: any, commentId: any, request: any) {
    return this.http.put(config.API_URL + `/forum/${categoryId}/comments/${commentId}`, request);
  }

  public deleteComment(categoryId: any, commentId: any, clientId: any) {
    return this.http.delete(config.API_URL + `/forum/${categoryId}/comments/${commentId}/${clientId}`);
  }

  public findAllPending() {
    return this.http.get(config.API_URL + `/forum/comments/pending`);
  }

  public acceptComment(commentId: any, request: any) {
    return this.http.put(config.API_URL + `/forum/comments/${commentId}/accept`, request);
  }

  public declineComment(commentId: any) {
    return this.http.delete(config.API_URL + `/forum/comments/${commentId}/decline`);
  }


}
