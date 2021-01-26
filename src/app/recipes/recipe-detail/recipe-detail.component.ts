import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { IngredientService } from 'src/IngredientService';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private ingredientService:IngredientService) {
    this.currRecipe=new Recipe("","","",[]);
   }
  @Input() currRecipe:Recipe;
  ngOnInit(): void {
  }
  toShoppingList()
  {
    for(let i=0;i<this.currRecipe.ingredients.length;i++)
    {
      let ingredientName=this.currRecipe.ingredients[i].name;
      let ingredientAmount=this.currRecipe.ingredients[i].amount;
      this.ingredientService.addIngredient(ingredientName,ingredientAmount);
    }

  }

}
