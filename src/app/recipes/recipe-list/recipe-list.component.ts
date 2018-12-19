import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

    recipes: Recipe[];
    private subscription: Subscription;


    constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
            this.recipes = recipes;
        });
        this.recipes = this.recipeService.getAllRecipes();
    }


    onAddNewRecipe() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}