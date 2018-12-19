import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditting = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('apples', 5),
        new Ingredient('tomatoes', 9)
    ];

    constructor() {
    }


    getAllIngredients() {
        return this.ingredients.slice();
    }

    addNewIngredient(newIngredient: Ingredient): void {
        this.ingredients.push(newIngredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]): void {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    setAllIngredients(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredientByIndex(index: number): Ingredient {
        return this.ingredients[index];
    }

    updateIngredient(index: number, updatedIng: Ingredient) {
        this.ingredients[index] = updatedIng;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredientByIndex(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}
