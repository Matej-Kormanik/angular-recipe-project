import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Observable} from 'rxjs/Observable';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import 'rxjs/Rx';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Ingredient} from './ingredient.model';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private ingredientsService: ShoppingListService,
                private authService: AuthService) {
    }


    saveRecipesToDb(): Observable<HttpResponse<Recipe[]>> {
        const token = this.authService.getToken();
        return this.http.put<Recipe[]>(
            'https://recipe-project-mk.firebaseio.com/recipes.json',
            this.recipeService.getAllRecipes(),
            {
                observe: 'response',
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                params: new HttpParams().set('auth', token)
            });
    }

    saveIngredientsToDb(): Observable<HttpResponse<Ingredient[]>> {
        const token = this.authService.getToken();
        return this.http.put<Ingredient[]>(
            'https://recipe-project-mk.firebaseio.com/ingredients.json',
            this.ingredientsService.getAllIngredients(),
            {
                observe: 'response',
                params: new HttpParams().set('auth', token)
            });
    }


    fetchRecipesFromDb() {
        const token = this.authService.getToken();

        return this.http.get<Recipe[]>('https://recipe-project-mk.firebaseio.com/recipes.json?auth=' + token)
            .map((recipes: Recipe[]) => {
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            })
            .subscribe((recipes: Recipe[]) => {
                    this.recipeService.setAllRecipes(recipes);
                    console.log('Recipes fetched successfully.');
                }, (error) => console.log(error)
            );
    }


    fetchIngredientsFromDb() {
        const token = this.authService.getToken();

        return this.http.get<Ingredient[]>('https://recipe-project-mk.firebaseio.com/ingredients.json?auth=' + token)
            .subscribe((ingredients) => {
                    this.ingredientsService.setAllIngredients(ingredients);
                    console.log('Ingredients fetched successfully.');
                    // console.log('ingredients fetched: ' + response.status + ' (' + response.statusText + ')');
                }, (error) => console.log(error)
            );
    }


}
