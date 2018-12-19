import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Observable} from 'rxjs/Observable';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import 'rxjs/Rx';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipeService,
                private ingredientsService: ShoppingListService,
                private authService: AuthService) {
    }


    saveRecipesToDb(): Observable<Response> {
        const token = this.authService.getToken();
        return this.http.put('https://recipe-project-mk.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getAllRecipes());
    }

    saveIngredientsToDb(): Observable<Response> {
        const token = this.authService.getToken();
        return this.http.put('https://recipe-project-mk.firebaseio.com/ingredients.json?auth=' + token, this.ingredientsService.getAllIngredients());
    }


    fetchRecipesFromDb() {
        const token = this.authService.getToken();

        return this.http.get('https://recipe-project-mk.firebaseio.com/recipes.json?auth=' + token)
            .map((response: Response) => {
                console.log('recipes fetched: ' + response.status + ' (' + response.statusText + ')');
                const recipes: Recipe[] = response.json();
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            })
            .subscribe((recipes: Recipe[]) => {
                    this.recipeService.setAllRecipes(recipes);
                }, (error) => console.log(error)
            );
    }


    fetchIngredientsFromDb() {
        const token = this.authService.getToken();

        return this.http.get('https://recipe-project-mk.firebaseio.com/ingredients.json?auth=' + token)
            .subscribe((response: Response) => {
                    this.ingredientsService.setAllIngredients(response.json());
                    console.log('ingredients fetched: ' + response.status + ' (' + response.statusText + ')');
                }, (error) => console.log(error)
            );
    }


}
