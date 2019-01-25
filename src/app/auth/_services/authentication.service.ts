import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { UserLogin1Component } from "../../theme/pages/self-layout-blank/snippets/pages/user/user-login-1/user-login-1.component";

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {
    }




    login(email: string, password: string) {
        const headers = new Headers(
            {
                'Content-Type': 'application/json'
            });

        const options = new RequestOptions({ headers: headers });

        return this.http.post('http://146.148.12.248:3002/api/authenticate', { email: email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                let user1 = {};
                console.log("GET HEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRREEEEEEEEEEEEEEEEEEEEE")
                if (user && user.token) {

                    // console.log(user);
                    console.log("GET HEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRREEEEEEEEEEEEEEEEEEEEND")
                    user1 = user.merchantInfo;
                    user1['token'] = user.token;
                    console.log(user1);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user1));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}