import { Injectable } from "@angular/core";
import { Ingredient } from "./app/shared/ingredient.model";

@Injectable()
export class IngredientService{

    ingredients:Ingredient[]=[
        new Ingredient("Apple",10)
    ]

    getIngredients(){
        return this.ingredients;
    }
    addIngredient(name:string,amount:number):void{
        if(name!=="" && amount>0)
        {
            this.ingredients.push(new Ingredient(name,amount));
        }
    }
   
}