import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('form') form: NgForm;

    ingToEdit: Ingredient;
    ingToEditIndex: number;

    editMode = false;

    subscription: Subscription;

    constructor(private shopListService: ShoppingListService, private router: Router) {
    }

    ngOnInit() {
        this.shopListService.startedEditting.subscribe((index: number) => {
            this.editMode = true;
            this.ingToEditIndex = index;
            this.ingToEdit = this.shopListService.getIngredientByIndex(index);
            if (this.form.controls['name'] && this.form.controls['amount']) {
                this.form.setValue({
                    'name': this.ingToEdit.name,
                    'amount': this.ingToEdit.amount
                });
            }
        });
    }


    onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
            this.shopListService.updateIngredient(this.ingToEditIndex, newIngredient);
        } else {
            this.shopListService.addNewIngredient(newIngredient);
        }
        this.editMode = false;
        form.reset();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        // this.router.navigate(['/recipes']);
    }

    onClear() {
        this.form.reset();
        this.editMode = false;
    }

    onDelete() {
        this.shopListService.deleteIngredientByIndex(this.ingToEditIndex);
        this.onClear();
    }
}
