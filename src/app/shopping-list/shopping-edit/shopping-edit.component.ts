import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IngredientService } from 'src/IngredientService';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', { static: false })
  nameInputRef: ElementRef | undefined;
  @ViewChild('amountInput', { static: false })
  amountInputRef: ElementRef | undefined;


  constructor(private ingredientService:IngredientService) { }

  ngOnInit(): void {
  }
  addIngredient():void{
    this.ingredientService.addIngredient(this.nameInputRef?.nativeElement.value,this.amountInputRef?.nativeElement.value);
  }
  
}
