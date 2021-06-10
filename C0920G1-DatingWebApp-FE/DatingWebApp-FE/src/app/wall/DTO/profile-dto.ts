import {IComment} from "./comment";

export  interface IProfileDTO {
  count: String;
  accountIdUser : number;
  commentIDpost:number;
  postStatus:String;
  commentDate:String;
  commentImg:String;
  postContent:String;
  commentID:number;
  userAvatar:String;
  idUserComment:number;
  idUserPost:number;
  postID : number;
  postDate:String;
  fullnameUser:String;
  commentIDparent:number;
  fullnameUserComment:String
  userAvatarComment:String
  commentContent:String;
  userBackground :String;
  postImg : String;
  idImg(): number;
  idPostImg:number;

}
