import { Component, OnInit } from '@angular/core';
import { IngredientService } from 'src/IngredientService';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
  
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[]=[];
  constructor(private ingredientService:IngredientService) {}

  ngOnInit(): void {
    this.ingredients=this.ingredientService.getIngredients();
  }

 
}
