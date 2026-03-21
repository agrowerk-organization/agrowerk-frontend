import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProducerBranding } from './register-components/producer-branding/producer-branding';
import { ProducerForm } from './register-components/producer-form/producer-form';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    ProducerBranding,
    ProducerForm
  ],
  templateUrl: './producer-register.html',
})
export class ProducerRegister {

}
