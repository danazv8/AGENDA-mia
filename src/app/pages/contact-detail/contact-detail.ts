import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContactService} from '../../services/contact';
import {Contact} from '../contacts/contact.interface';
import {RouterLink} from '@angular/router';


@Component({
  imports: [RouterLink],
  selector: 'app-contact-detail',
  styleUrl: './contact-detail.scss',
  templateUrl: './contact-detail.html',
})
export class ContactDetail {
  contacto: Contact | undefined;
  
  constructor(private route: ActivatedRoute, 
    private contactService: ContactService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contacto = this.contactService.contactos.find(contacto => contacto.id === id);
  }
}
