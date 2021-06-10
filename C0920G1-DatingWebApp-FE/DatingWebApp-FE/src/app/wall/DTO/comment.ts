import {Ipost} from "./post";

export interface IComment {
  _commentID: number;
  commentContent: String;
  commentDate: String;
  commentImg: String;

  idUserComment: number;
  commentIDparent : number;
  userAvatarComment: String;
  fullnameUserComment: String;
  comment : [];
  post : Ipost ;



}


