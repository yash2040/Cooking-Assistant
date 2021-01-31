import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{
    isLoginMode=true;
    isLoading=false;
    error:string;
    constructor(private authService:AuthService,private router:Router){
        this.error="";
    }

    onSwichMode()
    {
        this.isLoginMode=!this.isLoginMode;
    }
    onSubmit(form:NgForm)
    {
        if(!form.valid){
            return;
        }
        const email=form.value.email;
        const password=form.value.password;
        let authObs: Observable<AuthResponseData>;

        this.isLoading=true;
        if(!this.isLoginMode)
        {
            authObs=this.authService.signUp(email,password);
        }
        else{
            authObs=this.authService.login(email,password);
        }
        
        authObs.subscribe((responseData)=>{
            console.log(responseData);
            this.isLoading=false;
            this.error="";
            this.router.navigate(['/recipes']);
        },
        (errorMessage)=>{
           this.error=errorMessage;
           this.isLoading=false;
        });
        form.reset();
    }

}