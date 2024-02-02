import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ForumCategoryService {

  constructor(private http: HttpClient) { }

  public findAll() {
    return this.http.get(config.API_URL + "/forum/categories");
  }
}
