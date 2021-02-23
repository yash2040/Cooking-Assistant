import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeResolverService } from './recipes/recipes-resolver-service';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path:'', redirectTo: '/recipes',pathMatch:'full'},
  {path:'recipes' , component: RecipesComponent,canActivate:[AuthGuard],children:[
    {path:'' ,component:RecipeStartComponent},
    {path:'new' ,component:RecipeEditComponent,resolve:[RecipeResolverService]},
    {path:':id' ,component:RecipeDetailComponent,resolve:[RecipeResolverService]},
    {path:':id/edit' ,component:RecipeEditComponent,resolve:[RecipeResolverService]}

  ]},
  {path:'shoppinglist' , component: ShoppingListComponent},
  {path:'auth' , component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
