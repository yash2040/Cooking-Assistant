import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ClientCredentials } from "../clientcredentials";

interface AuthResponseData{
    kind:string,
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
}
@Injectable({providedIn:'root'})
export class AuthService{

    constructor(private http: HttpClient){

    }
    signUp(email:string,password:string)
    {
       return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+ClientCredentials.project_id,
        {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(errorResponse=>{
            let errorMessage="An Unknown Error Occured!";
            if(!errorResponse.error || !errorResponse.error.error)
            {
                return throwError(errorMessage);
            }
            switch(errorResponse.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage="Email Exists Already!!";
            }
            return throwError(errorMessage);
        }))
    }
}