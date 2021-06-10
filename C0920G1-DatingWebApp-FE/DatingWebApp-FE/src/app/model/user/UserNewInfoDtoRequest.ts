import { Account } from "./Account";
import { District } from "./District";
import { UserHobby } from "./UserHobby";

export class UserNewInfoDtoRequest{
    id: number;
    fullName: string;
    education: string;
    gender: string;
    descriptionUser: string;
    phone: string;
    avatar: string;
    statusConfirm: boolean;
    background: string;
    job: string;
    married: string;
    dayOfBirth: Date;
    datingGender: string;
    district: District;
    userHobbySet: UserHobby[];

}
