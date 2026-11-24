import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


const API_URL = 'http://localhost:5000/api/authentication';


@Injectable({
    providedIn: 'root'
})
export class Auth {
    constructor(private http: HttpClient) {}
    token: string | null = localStorage.getItem('token');
    isLoggedIn: boolean = this.token !== null;
    

    login(email:string, password: string): Observable<string>{
        return this.http.post(`${API_URL}/authenticate`, {email: email, password}, 
            {responseType: 'text'}
        );
    }

    guardarToken(token: string): void {
        this.token = token;
        this.isLoggedIn = true;
        localStorage.setItem('token', token);
    }
    

    logout(): void{
        this.token = null;
        this.isLoggedIn = false;
        localStorage.removeItem('token');
    }
}
