import {merchantinfo} from "./merchant-info";
export class User {
    id: number;
    email: string;
    mobile: string;
    password: string;
    firstname: string;
    surname: string;
    merchantinfoverified:boolean;
    merchantinfo?: merchantinfo[];
}
