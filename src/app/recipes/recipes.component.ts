import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  recipe:Recipe | undefined;
  constructor(private recipeService:RecipeService) {
   }

  ngOnInit(): void {
    this.recipeService.displayedRecipe.subscribe( (recipe:Recipe)=>{
      this.recipe=recipe;
    })
  }


}
