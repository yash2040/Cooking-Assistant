import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipe:Recipe | undefined;
  constructor() {
   }

  ngOnInit(): void {
  }
  getRecipeDetails(event:Recipe)
  {
    this.recipe=event;
  }

}
