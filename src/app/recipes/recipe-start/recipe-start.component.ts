import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  constructor(private recipeService:RecipeService) { }
  isEmptyRecipes:boolean=false;
  recipes: Recipe[] = [];
  recipeSubscription:Subscription | undefined;
  ngOnInit(): void {
    this.recipeSubscription=this.recipeService.recipeChanged.subscribe((recipes:Recipe[])=>{
      this.recipes=recipes;
      if(this.recipes.length!==0)
        this.isEmptyRecipes=false;
    });
    this.recipes=this.recipeService.getRecipes();
      if(this.recipes.length===0)
        this.isEmptyRecipes=true;
  }

}
