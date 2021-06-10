import {IComment} from "./comment";


export interface Ipost {
  postID: number;
  postContent: String;
  postDate: String;
  postStatus: String;
  count: String;

  commentList: IComment[];
}
