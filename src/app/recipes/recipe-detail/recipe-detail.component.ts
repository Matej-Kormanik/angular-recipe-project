import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    pickedRecipe: Recipe;
    id: number;

    constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.pickedRecipe = this.recipeService.getRecipeById(this.id);
        });
    }

    addToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.pickedRecipe.ingredients);
    }



    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }
}