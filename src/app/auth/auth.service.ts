import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token: string;

    constructor(private router: Router) {}

    /** Registracia */
    signAnUserUp(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => console.log(error));
    }


    /** Prihlasenie. */
    signAnUserIn(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                    .then((token: string) => this.token = token
                    );
                console.log('login successful\n' + response);
                }
            ).catch(
            error => console.log('login UNsuccessful\n' + error)
        );
    }


    getToken() {
         firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token;
    }

    isAuthenticated(): boolean {
        return this.token != null;
    }

    signOut() {
        firebase.auth().signOut();
        this.token = null;
    }

}
