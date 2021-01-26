import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService{
    private recipes: Recipe[]=[
        new Recipe("Pav Bhaji","Its an Indian dish","https://homepages.cae.wisc.edu/~ece533/images/airplane.png",[new Ingredient("Meat",32),new Ingredient("Flour",45)]),
        new Recipe("Chowmein","Its an Indian dish","https://homepages.cae.wisc.edu/~ece533/images/airplane.png",[new Ingredient("Tea",67),new Ingredient("Sugar",60)])
      ];
    displayedRecipe= new EventEmitter<Recipe>();  
      
    getRecipes(){
        return this.recipes.slice();
    } 
}