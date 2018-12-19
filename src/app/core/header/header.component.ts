import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';
import {HttpResponse} from '@angular/common/http';
import {Ingredient} from '../../shared/ingredient.model';
import {Recipe} from '../../recipes/recipe.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
    }

    ngOnInit() {
        // this.fetchFromDb();
    }


    saveToDb() {
        this.dataStorageService.saveIngredientsToDb().subscribe(
            (response: HttpResponse<Ingredient[]>) => {
                // console.log(response);
                console.log('ingredients updates to server: ' + response.status + ' (' + response.statusText + ')');
            },
                    (error) => console.log(error)
        );
        this.dataStorageService.saveRecipesToDb().subscribe(
            (response: HttpResponse<Recipe[]>) => {
                // console.log(response);
                console.log('recipes updates to server: ' + response.status + ' (' + response.statusText + ')');
                },
                    (error) => console.log(error)
        );
    }


    fetchFromDb() {
        this.dataStorageService.fetchRecipesFromDb();
        this.dataStorageService.fetchIngredientsFromDb();
    }

    onLogOut() {
        this.authService.signOut();
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}
