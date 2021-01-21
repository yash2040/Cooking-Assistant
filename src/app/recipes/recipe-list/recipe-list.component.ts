import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[]=[
    new Recipe("Pav Bhaji","Its an Indian dish","https://homepages.cae.wisc.edu/~ece533/images/airplane.png"),
    new Recipe("Pav Bhaji","Its an Indian dish","https://homepages.cae.wisc.edu/~ece533/images/airplane.png")
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
