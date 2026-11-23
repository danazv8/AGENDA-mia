import { Routes } from '@angular/router';
import {  Login } from './pages/login/login';
import { Contacts } from './pages/contacts/contacts';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'contacts',
        component: Contacts
    }
    
];

