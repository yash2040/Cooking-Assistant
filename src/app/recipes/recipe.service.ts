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
    getRecipeById(id:number|undefined)
    {
        if(id!==undefined)
        return this.recipes[id];
        return null;
    }
    
    updateRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(recipe:Recipe,id:number|undefined){
        if(id!==undefined)
        this.recipes[id]=recipe;
        this.recipeChanged.next(this.recipes.slice());
    }
    deleteRecipe(id:number|undefined){
        if(id!==undefined)
        this.recipes.splice(id,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}