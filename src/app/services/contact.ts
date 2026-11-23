import { Injectable } from '@angular/core';
import { Contact } from '../pages/contacts/contact.interface';


@Injectable({
    providedIn: 'root'
})

export class ContactService  {
    contactos: Contact[] = [
        { 
            id: 1, 
            nombre: 'Juan', 
            apellido: 'Pérez', 
            telefono: '123456789', 
            email: 'juan.perez@example.com'
        },
        {
            id: 2,
            nombre: 'María',
            apellido: 'González',
            telefono: '987654321',
            email: 'maria.gonzales@ejemplo.com'
        }
    ];

    agregarContacto(contacto: Contact): void {
        this.contactos.push(contacto);
    }

    eliminarContacto(id: number): void {
        const indice = this.contactos.findIndex(contacto => contacto.id === id);
        if (indice !== -1) {
            this.contactos.splice(indice, 1);
        }
    }

    editarContacto(id: number, contactoActualizado: Contact): void {
        const indice = this.contactos.findIndex(contacto => contacto.id === id);
        if (indice !== -1) {
            this.contactos[indice] = contactoActualizado;
        }
    }
}
