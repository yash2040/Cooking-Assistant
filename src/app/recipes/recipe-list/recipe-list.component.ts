import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[]=[
    new Recipe("Pav Bhaji","Its an Indian dish","https://homepages.cae.wisc.edu/~ece533/images/airplane.png"),
    new Recipe("Chowmein","Its an Indian dish","https://homepages.cae.wisc.edu/~ece533/images/airplane.png")
  ];
  @Output() currRecipeParent= new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit(): void {
  }
  onRecipeSelected(event:Recipe){
      this.currRecipeParent.emit(event);
  }

}
