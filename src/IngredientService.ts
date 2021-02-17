import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "./app/shared/ingredient.model";

@Injectable()
export class IngredientService{

    startedEditing=new Subject<number>();
    ingredients:Ingredient[]=[
        new Ingredient("Apple",10)
    ]

    getIngredients(){
        return this.ingredients;
    }
    getIngredient(index:number){
        return this.ingredients[index];
    }
    addIngredient(name:string,amount:number):void{
        if(name!=="" && amount>0)
        {
            this.ingredients.push(new Ingredient(name,amount));
        }
    }
    updateIngredient(index:number|undefined, newIngredient:Ingredient){
        if(index!==undefined)
        this.ingredients[index]=newIngredient;
    }
    deleteIngredient(index:number|undefined){
        if(index!==undefined)
        this.ingredients.splice(index,1);
    }
   
}