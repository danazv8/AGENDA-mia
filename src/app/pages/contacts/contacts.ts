import { Component, OnInit } from '@angular/core';
import {Contact} from './contact.interface';
import { ContactService } from '../../services/contact';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';


@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-contacts',
  styleUrl: './contacts.scss',
  templateUrl: './contacts.html',
})
export class Contacts implements OnInit {
  contactos: Contact[];
  nuevoNombre: string = '';
  nuevoApellido: string = '';
  nuevoTelefono: string = '';
  nuevoEmail: string = '';
  contactoEnEdicion: number | null = null;
  constructor(private contactService: ContactService, private authService: Auth, private router: Router) {
    
    this.contactos = this.contactService.contactos;
  }


  

  agregarContacto(contacto: Contact): void {
      this.contactService.agregarContacto(contacto);
      
    }

  async agregarNuevoContacto(): Promise<void> {
    const nuevoContacto: Contact = {
      id: 0,
      firstName: this.nuevoNombre,
      lastName: this.nuevoApellido,
      number: this.nuevoTelefono,
      email: this.nuevoEmail,
      isFavorite: false
    };
    try{
      await this.contactService.crearContacto(nuevoContacto);
      
      this.nuevoNombre = '';
      this.nuevoApellido = '';
      this.nuevoTelefono = '';
      this.nuevoEmail = '';
    } catch(error) {
      console.error('No se pudo agregar contacto:', error);
      alert('No se pudo agregar contacto. Por favor, inténtelo de nuevo.');
    }
    
    
  }

  async eliminarContacto(id: number): Promise<void> {
    try {
        await this.contactService.eliminarContacto(id);
    } catch (error) {
        console.error('No se pudo eliminar el contacto:', error);
        alert('No se pudo eliminar el contacto. Por favor, inténtelo de nuevo.');
    }
}

  
  async editarContacto(id: number, contactoActualizado: Contact): Promise<void> {
    await this.contactService.editarContacto(id, contactoActualizado);
}

  async ngOnInit(): Promise<void> {
    this.contactos = await this.contactService.getContacts();
  }

  iniciarEdicion(contacto: Contact): void {
    this.contactoEnEdicion = contacto.id;
    this.nuevoNombre = contacto.firstName;
    this.nuevoApellido = contacto.lastName;
    this.nuevoTelefono = contacto.number ?? '';
    this.nuevoEmail = contacto.email ?? '';
  }

  async guardarEdicion(): Promise<void> {
    if (this.contactoEnEdicion === null) return;

    const contactoActualizado: Contact = {
      id: this.contactoEnEdicion,
      firstName: this.nuevoNombre,
      lastName: this.nuevoApellido,
      number: this.nuevoTelefono,
      email: this.nuevoEmail,
      isFavorite: this.contactos.find(contacto => contacto.id === this.contactoEnEdicion)?.isFavorite ?? false
    };

    try {
      await this.contactService.editarContacto(this.contactoEnEdicion, contactoActualizado);

      this.contactoEnEdicion = null;
      this.nuevoNombre = '';
      this.nuevoApellido = '';
      this.nuevoTelefono = '';
      this.nuevoEmail = '';

    } catch (error) {
      console.error('No se pudo editar el contacto:', error);
      alert('No se pudo editar el contacto. Por favor, inténtelo de nuevo.');
    }
}

  cancelarEdicion(): void {
    this.contactoEnEdicion = null;
    this.nuevoNombre = '';
    this.nuevoApellido = '';
    this.nuevoTelefono = '';
    this.nuevoEmail = '';
  }


  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
