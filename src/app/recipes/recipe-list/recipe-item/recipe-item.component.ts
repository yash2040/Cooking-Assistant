import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe:Recipe;
  constructor() { 
    this.recipe=new Recipe("","","");
  }
  @Output() currRecipe= new EventEmitter<Recipe>();

  onRecipeClick(recipe:Recipe)
  {
    this.currRecipe.emit(recipe);
  }
 
  ngOnInit(): void {
  }

}
