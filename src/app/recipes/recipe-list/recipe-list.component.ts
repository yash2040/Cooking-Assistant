import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage-service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[]=[];
  recipeSubscription:Subscription | undefined;
  isFetching:boolean=false;
  fetchingSubscription:Subscription|undefined;
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute,private dataStorageService:DataStorageService) { }

  ngOnInit() {
    this.recipeSubscription=this.recipeService.recipeChanged.subscribe((recipes:Recipe[])=>{
      this.recipes=recipes;
    });
    this.recipes=this.recipeService.getRecipes();
    this.fetchingSubscription=this.dataStorageService.isFetching.subscribe((val)=>{
      this.isFetching=val;
    });
  }
  newRecipe(): void{
    this.router.navigate(['new'],{relativeTo:this.route})
  }
  ngOnDestroy(){
    this.recipeSubscription?.unsubscribe();
    this.fetchingSubscription?.unsubscribe();
  }
}
