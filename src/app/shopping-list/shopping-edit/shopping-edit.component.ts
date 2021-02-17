import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { IngredientService } from 'src/IngredientService';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f',{static:false}) slForm:NgForm | undefined;
  subscription:Subscription | undefined;
  editMode=false;
  editedItemIndex:number | undefined;
  editedItem:Ingredient | undefined;
  constructor(private ingredientService:IngredientService) { }

  ngOnInit(): void {
    this.subscription=this.ingredientService.startedEditing.subscribe((index:number)=>{
    this.editMode=true;
    this.editedItemIndex=index;
    this.editedItem=this.ingredientService.getIngredient(index);
    this.slForm?.setValue({
      name:this.editedItem.name,
      amount:this.editedItem.amount
    });
    })
  }
  addIngredient(form:NgForm):void{
    const value=form.value;
    if(this.editMode)
    {
      this.ingredientService.updateIngredient(this.editedItemIndex,new Ingredient(value.name,value.amount));
    }
    else
    this.ingredientService.addIngredient(value.name,value.amount);
    this.editMode=false;
    this.slForm?.resetForm();
  }
  onDelete()
  {
    this.ingredientService.deleteIngredient(this.editedItemIndex);
    this.slForm?.resetForm();
    this.editMode=false;
  }
  ngOnDestroy()
  {
    this.subscription?.unsubscribe();
  }
  
}
