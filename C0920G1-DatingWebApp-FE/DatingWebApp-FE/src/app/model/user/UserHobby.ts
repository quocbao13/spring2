import { Hobby } from "./Hobby";

export class UserHobby{
    id: number;
    hobby: Hobby;

  constructor(id: number, hobby: Hobby) {
    this.id = id;
    this.hobby = hobby;
  }
}
