import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('slovenske halusky',
            'Dorazila s kamarátkou. Pôvodne mala prísť so synom Alanom',
            'https://www.splide.com/wp-content/uploads/2011/08/paptert.jpg',
            [new Ingredient('meat', 2), new Ingredient('cheese', 4)]),
        new Recipe('talianska pizza',
            'Lorem ipsum dolor sit amet. consectetur adipiscing elit, sed do eiusmod tempor.',
            'http://images.bigoven.com/image/upload/t_recipe-256/chili-mushroom-recipe.jpg',
            [new Ingredient('pease', 12), new Ingredient('banana', 119)])
    ];

    constructor(private shopListService: ShoppingListService) {
    }


    getAllRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shopListService.addIngredients(ingredients);
    }

    getRecipeById(id: number): Recipe {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, updatedRecipe: Recipe): void {
        this.recipes[index] = updatedRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setAllRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

}
