import { Component } from '@angular/core';
import {Contact} from './contact.interface';
import { ContactService } from '../../services/contact';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';


@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-contacts',
  styleUrl: './contacts.scss',
  templateUrl: './contacts.html',
})
export class Contacts {
  contactos: Contact[];
  nuevoNombre: string = '';
  nuevoApellido: string = '';
  nuevoTelefono: string = '';
  nuevoEmail: string = '';
  contactoEnEdicion: number | null = null;
  constructor(private contactService: ContactService) {
    
    this.contactos = this.contactService.contactos;
  }

  agregarContacto(contacto: Contact): void {
      this.contactService.agregarContacto(contacto);
      
    }

  agregarNuevoContacto(): void {
    const nuevoContacto: Contact = {
      id: this.contactos.length > 0 
      ? Math.max(...this.contactos.map(contacto => contacto.id)) + 1 : 1,
      nombre: this.nuevoNombre,
      apellido: this.nuevoApellido,
      telefono: this.nuevoTelefono,
      email: this.nuevoEmail
    };
    this.agregarContacto(nuevoContacto);
    this.nuevoNombre = '';
    this.nuevoApellido = '';
    this.nuevoTelefono = '';
    this.nuevoEmail = '';
  }

  eliminarContacto(id: number): void {
    this.contactService.eliminarContacto(id);
  }
  
  editarContacto(id: number, contactoActualizado: Contact): void {
    this.contactService.editarContacto(id, contactoActualizado);
  }

  iniciarEdicion(contacto: Contact): void {
    this.contactoEnEdicion = contacto.id;
    this.nuevoNombre = contacto.nombre;
    this.nuevoApellido = contacto.apellido;
    this.nuevoTelefono = contacto.telefono;
    this.nuevoEmail = contacto.email;
  }

  guardarEdicion(): void {
    if (this.contactoEnEdicion === null) return;
    const contactoActualizado: Contact = {
      id: this.contactoEnEdicion,
      nombre: this.nuevoNombre,
      apellido: this.nuevoApellido,
      telefono: this.nuevoTelefono,
      email: this.nuevoEmail
    };
    this.editarContacto(this.contactoEnEdicion, contactoActualizado);
    this.contactoEnEdicion = null;
    this.nuevoNombre = '';
    this.nuevoApellido = '';
    this.nuevoTelefono = '';
    this.nuevoEmail = '';
  }

  cancelarEdicion(): void {
    this.contactoEnEdicion = null;
    this.nuevoNombre = '';
    this.nuevoApellido = '';
    this.nuevoTelefono = '';
    this.nuevoEmail = '';
  }


}
