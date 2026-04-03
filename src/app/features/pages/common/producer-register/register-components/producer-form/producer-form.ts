import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Register } from '@shared/layouts-components/register/register';
import { AccessProfile } from '@core/enums/access-profile';
@Component({
  selector: 'app-producer-form',
  standalone: true,
  imports: [CommonModule, Register],
  templateUrl: './producer-form.html'
})
export class ProducerForm {

  readonly AccessProfile = AccessProfile;

}