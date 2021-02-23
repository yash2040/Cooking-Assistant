import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { IngredientService } from 'src/IngredientService';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private ingredientService:IngredientService,private route:ActivatedRoute,private recipeService:RecipeService,private router:Router) {
    this.currRecipe=new Recipe("","","",[]);
   }
 currRecipe:Recipe;
 id: number | undefined;
  ngOnInit(): void {

    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id'];
      let currRecipe=this.recipeService.getRecipeById(this.id);
      if(currRecipe!==null)
      this.currRecipe=currRecipe;
    })

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
  editRecipe()
  {
      this.router.navigate(['edit'],{relativeTo:this.route});
  }

}
