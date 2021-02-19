import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService{
   
    recipeChanged= new Subject<Recipe[]>();
    private recipes: Recipe[]=[];
   
    
      
    getRecipes(){
        return this.recipes.slice();
    }
    getRecipeById(id:number)
    {
        return this.recipes[id];
    }
    
    updateRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipeChanged.next(this.recipes.slice());
     //   console.log(this.recipes.slice());
    }
}