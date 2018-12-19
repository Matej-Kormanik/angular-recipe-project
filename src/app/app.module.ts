import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        SharedModule,
        ShoppingListModule,
        CoreModule,
        AuthModule,
        AppRoutingModule,
        HttpModule,
        HttpClientModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}