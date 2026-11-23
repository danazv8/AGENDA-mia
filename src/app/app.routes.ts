import { Routes } from '@angular/router';
import {  Login } from './pages/login/login';
import { Contacts } from './pages/contacts/contacts';
import {ContactDetail} from './pages/contact-detail/contact-detail';


export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'contacts',
        component: Contacts
    },
    {
        path: 'contacts/:id',
        component: ContactDetail
    }
];

