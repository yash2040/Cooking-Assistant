import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { ClientCredentials } from "../clientcredentials";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData{
    kind:string,
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:string;
}
@Injectable({providedIn:'root'})
export class AuthService{

    user= new BehaviorSubject<User|null>(null);
    private tokenExpirationTimer:any;
    constructor(private http: HttpClient,private router:Router){

    }
    signUp(email:string,password:string)
    {
       return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+ClientCredentials.project_id,
        {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.handleError) ,tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }));
    }

    login(email:string,password:string)
    {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+ClientCredentials.project_id,
        {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.handleError),tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }));
    }
    autoLogin()
    {
        let userString=sessionStorage.getItem('userData') || '{}';
        const userData:{
            email:string;
            id:string;
            _token:string;
            _tokenExpirationDate:string;
        } = JSON.parse(userString);
        console.log(userData);
        if(Object.keys(userData).length===0)
        {
            //this.logout(); 
            return;
        }
        console.log(userData);
        const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedUser.token)
        {
            this.user.next(loadedUser);
            const expirationDuration=new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout()
    {
        this.user.next(null);
        this.router.navigate(['/auth']);
        sessionStorage.removeItem('userData');
        if(this.tokenExpirationTimer)
            clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer=null;
    }

    autoLogout(expirationDuration: number)
    {
       this.tokenExpirationTimer= setTimeout(()=>{
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email:string,userId:string,tokenId:string,expiresIn:number)
    {

        const expirationDate=new Date(new Date().getTime() + +expiresIn*1000);
        const user=new User(email,userId,tokenId,expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        sessionStorage.setItem('userData', JSON.stringify(user));
    }
    private handleError(errorResponse: HttpErrorResponse)
    {
        let errorMessage="An Unknown Error Occured!";
        if(!errorResponse.error || !errorResponse.error.error)
        {
            return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage="Email Exists Already!!";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage="Email Not Found!!";
                break;
            case 'INVALID_PASSWORD':
                errorMessage="Incorrect Password!!";
                break;
        }
        return throwError(errorMessage);
    }
}