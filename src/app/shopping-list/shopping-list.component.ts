import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients: Ingredient[] = [];
    private subscription: Subscription;

    constructor(private shopListService: ShoppingListService) {
    }

    ngOnInit() {
        this.ingredients = this.shopListService.getAllIngredients();
        this.subscription = this.shopListService.ingredientsChanged.subscribe(
            (ingredList: Ingredient[]) => {
                this.ingredients = ingredList;
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }


    onEditItem(index: number): void {
        this.shopListService.startedEditting.next(index);
    }
}
