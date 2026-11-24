import { Routes } from '@angular/router';
import {  Login } from './pages/login/login';
import { Contacts } from './pages/contacts/contacts';
import {ContactDetail} from './pages/contact-detail/contact-detail';
import {authGuard} from './guards/auth-guard';


export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'contacts',
        component: Contacts,
        canActivate: [authGuard]
    },
    {
        path: 'contacts/:id',
        component: ContactDetail,
        canActivate: [authGuard]
    }
];

