import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";

@Injectable()
export class UserService {
    constructor(private http: Http) {
    }

    verify() {
        return this.http.post('http://146.148.12.248:3002/api/verify', this.jwt()).map((response: Response) => response.json());
    }

    forgotPassword(email: string) {
        return this.http.post('http://146.148.12.248:3002/api/forgot-password', JSON.stringify({ email }), this.jwt()).map((response: Response) => response.json());
    }

    getAll() {

        return this.http.get('http://146.148.12.248:3002/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('http://146.148.12.248:3002/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {

        console.log(user);
        console.log("get here");


        return this.http.post('http://146.148.12.248:3002/api/registration', user, this.jwt()).map((response: Response) => response.json());
        // return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('http://146.148.12.248:3002/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('http://146.148.12.248:3002/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        console.log("pvt jwt ran");
        console.log()
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}