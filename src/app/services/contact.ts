import { Injectable, inject } from '@angular/core';
import { Contact } from '../pages/contacts/contact.interface';
import { Auth } from './auth';

const API_URL = 'http://localhost:5000/api/contacts';
@Injectable({
    providedIn: 'root'
})

export class ContactService  {
    private authService = inject(Auth);
    contactos: Contact[] = [
        { 
            id: 1, 
            firstName: 'Juan', 
            lastName: 'Pérez', 
            number: '123456789', 
            email: 'juan.perez@example.com',
            isFavorite: false
        },
        {
            id: 2,
            firstName: 'María',
            lastName: 'González',
            number: '987654321',
            email: 'maria.gonzales@ejemplo.com',
            isFavorite: false
        }
    ];

    constructor() { 
        const contactosGuardados = localStorage.getItem('contactos');
        if (contactosGuardados) {
            this.contactos = JSON.parse(contactosGuardados);
        }
    }
    async getContacts(): Promise<Contact[]> {
    const respuesta = await fetch(API_URL, {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${this.authService.token}`
        }
    });
    if (!respuesta.ok) {
        console.error('Error al obtener los contactos:', respuesta.status);
        return [];
    }

    const contactos = await respuesta.json();
    this.contactos = contactos;
    return contactos;
    }

    async crearContacto(contacto: Contact): Promise<Contact> {
    const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authService.token}`
        },
        body: JSON.stringify({
            firstName: contacto.firstName,
            lastName: contacto.lastName,
            number: contacto.number,
            email: contacto.email
        })
    });

    if (!respuesta.ok) {
        throw new Error('Error al crear el contacto: ' + respuesta.status);
    }

    const nuevoContacto: Contact = await respuesta.json();

    this.contactos.push(nuevoContacto);

    return nuevoContacto;
}




    guardarEnLocalStorage(): void {
        localStorage.setItem('contactos', JSON.stringify(this.contactos));
    }

    agregarContacto(contacto: Contact): void {
        this.contactos.push(contacto);
        this.guardarEnLocalStorage();
    }

    async eliminarContacto(id: number): Promise<void> {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${this.authService.token}`
        }
    });

    if (!respuesta.ok) {
        throw new Error('Error al eliminar el contacto: ' + respuesta.status);
    }

    const indice = this.contactos.findIndex(contacto => contacto.id === id);

    if (indice !== -1) {
        this.contactos.splice(indice, 1);
    }
}

    async editarContacto(id: number, contactoActualizado: Contact): Promise<void> {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.authService.token}`
            },
            body: JSON.stringify({
                firstName: contactoActualizado.firstName,
                lastName: contactoActualizado.lastName,
                number: contactoActualizado.number,
                email: contactoActualizado.email
            })
        });

        if (!respuesta.ok) {
            throw new Error('error al editar el contacto ' + respuesta.status );

        }

        const indice = this.contactos.findIndex(contacto => contacto.id === id);

            
        if (indice !== -1) {
            this.contactos[indice] = contactoActualizado;
        
        }
    }

    
}


