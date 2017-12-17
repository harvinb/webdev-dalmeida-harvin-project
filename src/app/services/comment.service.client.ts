import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Comment} from '../models/comment/comment.model.client';

// injecting service into module
@Injectable()

export class CommentServiceClient {
  baseUrl = environment.baseUrl;

  constructor(private http: Http) { }

  api = {
    'createComment'   : this.createComment,
    'findAllCommentsForTeam' : this.findAllCommentsForTeam,
    'findCommentById' : this.findCommentById,
    'updateComment' : this.updateComment,
    'deleteComment' : this.deleteComment
  };

  createComment(userId: string, tId: string, comment: Comment) {
    const url = this.baseUrl + '/api/user/' + userId + '/team/' + tId + '/comment';

    return this.http.post(url, comment)
      .map((response: Response) => {
        return response.json();
      });
  }

  findAllCommentsForTeam(tId: string) {
    const url = this.baseUrl + '/api/comment/team/' + tId;
    console.log(url);
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findCommentById(cId: string) {
    const url = this.baseUrl + '/api/comment/' + cId;
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateComment(cId: string, comment: Comment) {
    const url = this.baseUrl + '/api/comment/' + cId;
    return this.http.put(url, comment)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteComment(cId: string) {
    const url = this.baseUrl + '/api/comment/' + cId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }
}
