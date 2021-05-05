import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { tap } from 'rxjs/operators'

@Injectable({providedIn:'root'})
export class DataStorageService{
   
    recipesAvailaible:boolean=false;
    isFetching= new Subject<boolean>();
    constructor(private http:HttpClient,private recipeService:RecipeService){}
    
    storeRecipes()
    {
        const recipes=this.recipeService.getRecipes();
        this.http.put("https://chef-s-assistant-20129-default-rtdb.firebaseio.com/recipes.json",recipes)
        .subscribe(response=>{
            console.log(response);
        });
    }
    fetchRecipes() {
        this.isFetching.next(true);
        return this.http.get<Recipe[]>("https://chef-s-assistant-20129-default-rtdb.firebaseio.com/recipes.json").pipe(tap(recipes=>{
        if(recipes===null)
            recipes=[]; 
        this.recipesAvailaible=true;
        this.isFetching.next(false);
        this.recipeService.updateRecipes(recipes);
        }));
        
    }

}